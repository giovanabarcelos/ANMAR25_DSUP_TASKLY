import "reflect-metadata"
import express from "express"
import dotenv from "dotenv"
import { AppDataSource } from "./dataSource"
import routes from "./routes"
import { errorHandler } from "./middlewares/errorHandler"

dotenv.config()

const app = express()
app.use(express.json())
app.use(routes)
app.use(errorHandler)

const PORT = process.env.PORT || 3000

AppDataSource.initialize()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })
  })
  .catch((error : string) => {
    console.error(error)
  })