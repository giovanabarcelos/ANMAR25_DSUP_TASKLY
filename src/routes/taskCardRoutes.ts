import { Router } from "express"
import { TaskController  } from "../controllers/taskCardController"
import { validateTask } from "../middlewares/validateTask"

const routes = Router()
const controller = new TaskController()

routes.post('/tasks', validateTask, controller.create.bind(controller))
routes.get('/tasks', controller.list.bind(controller))
routes.get('/tasks/:id', controller.getTask.bind(controller))
routes.get('/tasks/status/:status', controller.getByStatus.bind(controller))
routes.put('/tasks/:id', validateTask, controller.update.bind(controller))
routes.delete('/tasks/:id', controller.delete.bind(controller))


export default routes