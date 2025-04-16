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

  async getTask(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const id = Number(req.params.id)
      if(isNaN(id)) {
        return res.status(400).json({ message: 'Invalid task ID!' })
      }
      const task = await service.getTaskById(id)
      if(!task) {
        return res.status(404).json({ message: 'Task not found!' })
      }
      res.status(200).json(task)
    } catch(error) {
      next(error)
    }
  }

  async getByStatus(req: Request, res: Response, next: NextFunction): Promise<any> {
    try{
      const { status } = req.params
      const validStatus = ['Todo', 'In Progress', 'Done']
      if (!validStatus.includes(status)) {
        return res.status(400).json({ message: 'Invalid Status!' })
      }
      const task = await service.getTaskByStatus(status)
      res.status(200).json(task)
    } catch(error) {
      next(error)
    }
  }

  async update(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const id = Number(req.params.id)
      if(isNaN(id)) {
        return res.status(400).json({ message: 'Invalid task ID!' })
      }
      const updateTask = await service.update(id, req.body)
      if(!updateTask) {
        return res.status(400).json({ message: 'Task not found!' })
      }
      res.status(200).json(updateTask)
    } catch(error) {
      next(error)
    }
  }
}