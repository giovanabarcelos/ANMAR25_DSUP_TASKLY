import { AppDataSource } from "../dataSource"
import { TaskNote } from "../entities/TaskNote"

export const taskNoteRepository = AppDataSource.getRepository(TaskNote)