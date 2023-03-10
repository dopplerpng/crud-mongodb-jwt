import jwt from 'jsonwebtoken'
import bcrypt from "bcryptjs"
import express from 'express'
import User from '../models/user.model'
import 'mongoose'
import 'dotenv'
import {config} from '../config/env'


export const signUp = async(request:express.Request, response:express.Response, next:express.NextFunction )=>{
        
    const {username,email, password} = request.body

    if(!username){
        return response.status(400).json({msg:'invalid username'})
    }

    if(!email){
        return response.status(400).json({msg:'invalid email'})
    }

    if(!password){
        return response.status(400).json({msg:'invalid password'})
    }
    const emailExists = User.findOne({email:email})
    const userExists = User.findOne({username:username})
    
  
    if(await emailExists || await userExists ){
        return response.status(400).json({msg:'Username or email already used'})
    }
    const salt = await bcrypt.genSalt(12)
    const hashPassword = await bcrypt.hash(password, salt)
    const user = new User({
        username,
        password:hashPassword,
        email

    })

    try{
        user.save()
        response.status(200).json({userData:user})
    }catch(err){
        console.log(err + "<- error")
        response.status(501).json({msg:err})
    }
    
    
}

export const signIn = async(request:express.Request, response:express.Response, next:express.NextFunction) =>{
    let { username} = request.body;
    const userExist:any = await User.findOne({username:username})
    
    if(!userExist ){
        const error = new Error("something wrong here!")
        return next(error)
    }
    const validPassword = await bcrypt.compare(request.body.password, userExist.password);
    if(!validPassword){
        const error = new Error("Invalid password")
        return  next(error)
    }
    let token = jwt.sign(
        {userId: userExist.id, username:userExist.username},
        config.SECRET,
        {expiresIn:'1h'})
    response.status(200).json({success:true, data:{
        userId:userExist.id,
        token:token
    }})
   
}

