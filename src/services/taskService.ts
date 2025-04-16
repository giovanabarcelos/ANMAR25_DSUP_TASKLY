import { taskRepository } from "../repositories/taskRepository"
import { taskCardRepository } from "../repositories/taskCardRepository"
import { TaskCard } from "../entities/TaskCard"


export class TaskService {
  async create(data: Partial<TaskCard>): Promise<TaskCard> {
    try {
      const task = taskRepository.create(data)
      return await taskRepository.save(task)
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
}