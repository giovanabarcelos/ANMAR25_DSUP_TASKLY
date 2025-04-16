import { AppDataSource } from "../dataSource"
import { TaskCard } from "../entities/TaskCard"

export const taskRepository = AppDataSource.getRepository(TaskCard)
