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
}