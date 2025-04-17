import { Router } from "express"
import taskCardRoutes from "./taskCardRoutes"
import taskNoteRoutes from "./taskNoteRoutes"

const router = Router()

router.use('/', taskCardRoutes)
router.use('/', taskNoteRoutes)

export default router
