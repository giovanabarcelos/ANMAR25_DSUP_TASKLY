import { Request, Response, NextFunction } from "express"
import { TaskService } from "../services/taskService"

const service = new TaskService()

export class TaskController {
  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const task = await service.create(req.body)
      res.status(201).json(task)
    } catch (error) {
      next(error)
    }
  }

  async list(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const tasks = await service.getAll()
      res.status(200).json(tasks)
    } catch (error) {
      next(error)
    }
  }
}
