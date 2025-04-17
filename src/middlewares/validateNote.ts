import { z } from "zod"
import { Request, Response, NextFunction } from "express"

const noteSchema = z.object({
    content: z.string().min(1).max(255)
})

export function validateNote(req: Request, res: Response, next: NextFunction): any {
    const validation = noteSchema.safeParse(req.body)

    if(!validation.success) {
        return res.status(400).json({
            error: 'Invalid note data', 
            issues: validation.error.format(),
        })
    }
    next()
}