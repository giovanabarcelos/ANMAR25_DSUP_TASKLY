import { AppDataSource } from "../dataSource"
import { TaskCard } from "../entities/TaskCard"

export const taskCardRepository = AppDataSource.getRepository(TaskCard)
