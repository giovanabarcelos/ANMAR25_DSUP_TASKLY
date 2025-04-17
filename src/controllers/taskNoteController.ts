import { Request, Response, NextFunction } from "express"
import { TaskNoteService } from "../services/taskNoteService"

const service = new TaskNoteService()

export class TaskNoteController {
  async create(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const taskId = Number(req.params.taskId)
      const { content } = req.body

      const note = await service.createNote(taskId, content)
      res.status(201).json(note)
    } catch (error) {
      next(error)
    }
  }
}
