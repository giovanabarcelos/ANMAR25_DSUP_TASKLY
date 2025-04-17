import { TaskNote } from "../entities/TaskNote"
import { taskNoteRepository } from "../repositories/taskNoteRepository"
import { taskCardRepository } from "../repositories/taskCardRepository"

export class TaskNoteService {
  async createNote(taskId: number, content: string): Promise<TaskNote> {
    const task = await taskCardRepository.findOneBy({ id: taskId })

    if (!task) {
      throw new Error("Task not found")
    }

    const note = taskNoteRepository.create({
      content,
      taskCard: task,
    })

    return await taskNoteRepository.save(note)
  }
}
