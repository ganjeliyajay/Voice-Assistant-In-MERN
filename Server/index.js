import express, { json, urlencoded } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'

dotenv.config()

const app = express()


app.use(json(), urlencoded({ extended: true }))
app.use(cors())

const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Server is running on : ${PORT}`))