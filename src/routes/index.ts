import { Router } from "express"
import { taskController  } from "../controllers/taskController"
import { validateTask } from "../middlewares/validateTask"


const routes = Router()
const controller = new taskController()

routes.post('/tasks', validateTask, controller.create.bind(controller))

export default routes
