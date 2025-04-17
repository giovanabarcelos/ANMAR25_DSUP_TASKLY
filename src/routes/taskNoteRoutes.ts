import { Router } from "express"
import { TaskNoteController } from "../controllers/taskNoteController"
import { validateNote } from "../middlewares/validateNote"

const routes = Router()
const controller = new TaskNoteController()

routes.post("/tasks/:taskId/notes", validateNote, controller.create.bind(controller))
routes.get("/tasks/:taskId/notes", controller.listByTask.bind(controller))

export default routes