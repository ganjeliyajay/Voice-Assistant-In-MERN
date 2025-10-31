import express, { json, urlencoded } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { DatabaseConncet } from './Configs/db.js'
import { routes } from './Routes/AuthRoutes.js'

dotenv.config()

const app = express()


app.use(json(), urlencoded({ extended: true }))
app.use(cookieParser())
app.use(cors())

//Databaseconnected
DatabaseConncet()

//Routes
app.use('/assistant', routes)

const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Server is running on : ${PORT}`))