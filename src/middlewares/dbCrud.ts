import express from 'express'
import { MongoClient } from 'mongodb'
import { MONGO_URI } from '../config/database'



export const db = {
    getData:async (userId:string) => {
        
        return (await MongoClient.connect(MONGO_URI)).db('test').collection('users').findOne({userId:userId})
    },
    

}