import express from 'express'
import jwt from 'jsonwebtoken'
import { config } from '../config/env'
import dotenv from 'dotenv'
import { db } from './dbCrud'




dotenv.config()
export const checkToken = (request:express.Request, response:express.Response, next:express.NextFunction)=>{
    const token:any = request.headers.authorization?.split(' ')[1]
    if(!token){
        response.status(401)
    }
    const decodedToken:any = jwt.verify(token, config.SECRET )
    response.status(200).json({data:decodedToken})
    next()
    
}