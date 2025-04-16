import { Router } from "express"
import taskRoutes from "./taskRoutes"

const router = Router()

router.use("/", taskRoutes)

export default router
