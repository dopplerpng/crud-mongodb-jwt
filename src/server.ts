import express from 'express'
import router from './router/routes'
import cors from 'cors'

const CorsOptions = {
    origin:`http://localhost:${process.env.PORT}` || "http://localhost:3333" 
}
import dotenv from 'dotenv'
dotenv.config()

import {connect} from './config/database'

const app = express()
const PORT = process.env.PORT || 3333



connect()
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors(CorsOptions))
app.use(express.json())
app.use(router)

app.listen(PORT,()=>{
    console.log(`Server running at localhost:${PORT}`)
})

