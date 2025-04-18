import { z } from "zod"
import { Request, Response, NextFunction } from "express"

const taskSchema = z.object({
  title: z.string().min(1).max(100),
  description: z.string().min(1),
  category: z.string().min(1).max(30),
  status: z.enum(["Todo", "In Progress", "Done"]),
  priority: z.enum(["Low", "Medium", "High"]),
})

export function validateTask(req: Request, res: Response, next: NextFunction): void {
  const validation = taskSchema.safeParse(req.body)

  if (!validation.success) {

    res.status(400).json({
      error: 'Invalid data',
      issues: validation.error.format(),
    })
    return
  }
  next()
}