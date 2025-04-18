
import { taskCardRepository } from "../repositories/taskCardRepository"
import { TaskCard } from "../entities/TaskCard"
import { Like } from "typeorm";
import { z } from "zod";
import { taskFilterSchema } from "../middlewares/taskFilterValidation"

type TaskFilter = z.infer<typeof taskFilterSchema>

export class TaskCardService {
  async create(data: Partial<TaskCard>): Promise<TaskCard> {
    try {
      const task = taskCardRepository.create(data)
      return await taskCardRepository.save(task)
    } catch (error: any) {
      throw new Error(`Error creating task: ${error.message}`)
    }
  }

  async getAll(): Promise<TaskCard[]> {
    return await taskCardRepository.find({
      relations: ["notes"],
      order: {
        created_at: "DESC",
      },
    })
  }

  async getTaskById(id: number): Promise<TaskCard | null> {
    const task = await taskCardRepository.findOne({
      where: { id },
      relations: ["notes"],
    })
    return task
  }

  async getTaskByStatus(status: string): Promise<TaskCard[]> {
    return await taskCardRepository.find({
      where: { status },
      relations: ["notes"],
      order: {
        created_at: "DESC",
      },
    })
  }

  async update(id: number, data: Partial<TaskCard>): Promise<TaskCard | null> {
    try {
      const task = await taskCardRepository.findOne({ where: { id } })
      if(!task) {
        return null
      }   
      Object.assign(task, data)
      return await taskCardRepository.save(task)
    } catch(error: any) {
      throw new Error(`Error updating task: ${error.message}`)
    }
  }
  async delete(id: number): Promise<void> {
    try{
      const task = await taskCardRepository.findOne({
        where: { id },
        relations: ["notes"],
      })
      if(!task) {
        throw new Error("Task not found")
      }
      for(const note of task.notes) {
        note.taskCard = null
        await taskCardRepository.manager.save(note)
      }
      await taskCardRepository.delete(id)
    }catch(error: any) {
      throw new Error(`Error deleting task: ${error.message}`)
    }
  }


  async filterTasks(query: TaskFilter): Promise<{
    data: TaskCard[]
    total: number
    page: number
    limit: number
  }> {
    const { title, category, priority, status, page, limit } = query

    const where: any = {}
    if (title) where.title = Like(`%${title}%`)
    if (category) where.category = category
    if (priority) where.priority = priority
    if (status) where.status = status

    const [tasks, total] = await taskCardRepository.findAndCount({
      where,
      relations: ["notes"],
      order: { created_at: "DESC" },
      skip: (page - 1) * limit,
      take: limit,
    })

    return {
      data: tasks,
      total,
      page,
      limit,
    }
  }
}