import { Request, Response, NextFunction } from "express"
import { taskService } from "../services/taskService" 

const service = new taskService()

export class taskController {
  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const task = await service.create(req.body)
      res.status(201).json(task)
    } catch (error) {
      next(error)
    }
  }
}
