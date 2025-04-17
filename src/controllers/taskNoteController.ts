import { Request, Response, NextFunction } from "express"
import { TaskNoteService } from "../services/taskNoteService"

const service = new TaskNoteService()

export class TaskNoteController {
  async create(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const taskId = Number(req.params.taskId)
      const { content } = req.body
      if (isNaN(taskId)) {
        return res.status(400).json({ message: "Invalid task ID!" })
      }

      const note = await service.createNote(taskId, content)
      res.status(201).json(note)
    } catch (error) {
      if (error instanceof Error && error.message === 'Task not found') {
        return res.status(404).json({ message: error.message });
      }
      next(error)
    }
  }

  async listByTask(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const taskId = Number(req.params.taskId)
      if (isNaN(taskId)) {
        return res.status(400).json({ message: "Invalid task ID!" })
      }

      const notes = await service.getNotesByTask(taskId)
      res.status(200).json(notes)
    } catch (error) {
      if (error instanceof Error && error.message === 'Task not found') {
        return res.status(404).json({ message: error.message });
      }
      next(error)
    }
  }

  async getById(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid note ID!' });
      }
  
      const note = await service.getNoteById(id);
      res.status(200).json(note);
    } catch (error) {
      if (error instanceof Error && error.message === 'Note not found') {
        return res.status(404).json({ message: error.message });
      }
      next(error);
    }
  }

}
