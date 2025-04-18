import { z } from "zod"
import { Request, Response, NextFunction } from "express"
import { RequestHandler } from "express"

export const taskFilterSchema = z.object({
  title: z.string().optional(),
  category: z.string().optional(),
  priority: z.enum(["Low", "Medium", "High"]).optional(),
  status: z.enum(["Todo", "In Progress", "Done"]).optional(),
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(10),
})

export const validateQuery: RequestHandler = (req: Request, res: Response, next: NextFunction): any => {
    const result = taskFilterSchema.safeParse(req.query)
  
    if (!result.success) {
      return res.status(400).json({
        error: "Invalid query parameters",
        issues: result.error.format(),
      })
    }
  
    res.locals.queryParams = result.data
    next()
  }
