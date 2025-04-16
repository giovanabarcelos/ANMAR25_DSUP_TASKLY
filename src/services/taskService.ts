import { taskRepository } from "../repositories/taskRepository"
import { TaskCard } from "../entities/TaskCard"

export class taskService {
  async create(data: Partial<TaskCard>): Promise<TaskCard> {
    try {
      const task = taskRepository.create(data)
      return await taskRepository.save(task)
    } catch (error: any) {

      throw new Error(`Error creating task: ${error.message}`)
    }
  }
}
