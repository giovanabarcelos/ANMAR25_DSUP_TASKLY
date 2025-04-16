import "reflect-metadata"
import { DataSource } from "typeorm"
import { TaskCard } from "./entities/TaskCard"
import { TaskNote } from "./entities/TaskNote"
import dotenv from "dotenv"

dotenv.config()

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  logging: false,
  entities: [TaskCard, TaskNote],
  migrations: ["src/migrations/*.ts"],
  subscribers: [],
})