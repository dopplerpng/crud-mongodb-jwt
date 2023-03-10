import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

export const MONGO_URI:any = process.env.MONGO_URI

export const connect = ()=>{
    mongoose.connect(MONGO_URI,{})

    mongoose.connection.on('connected', ()=>{
        console.log("Mongoose connected")
    })

    mongoose.connection.on('error', (err: string)=>{
        console.log('Mongoose connection error:'+err)
    })

    mongoose.connection.on('disconnected', ()=>{
        console.log('Mongoose connection disconnected')
    })
}
