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

  async getNotesByTask(taskId: number) {
    const task = await taskCardRepository.findOne({ where: { id: taskId } });

    if (!task) {
      throw new Error('Task not found');
    }
  
    const notes = await taskNoteRepository.find({
      where: { taskCard: { id: taskId } },
      relations: ['taskCard'],
    });
  
    return notes;
  }
}
