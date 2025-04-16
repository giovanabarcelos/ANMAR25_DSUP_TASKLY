import { Router } from "express"
import { TaskController  } from "../controllers/taskController"
import { validateTask } from "../middlewares/validateTask"

const routes = Router()
const controller = new TaskController()

routes.post('/tasks', validateTask, controller.create.bind(controller))
routes.get("/tasks", controller.list.bind(controller))

export default routes