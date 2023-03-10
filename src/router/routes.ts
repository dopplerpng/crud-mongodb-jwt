import * as express from 'express'
import path from 'path'
const app = express
const router = app.Router()
import bodyParser from 'body-parser'

router.use(app.json())
router.use(bodyParser.urlencoded({extended:true}))
router.use(bodyParser.json())

import bcrypt from 'bcryptjs'

import { signIn, signUp } from '../controllers/account'
import { checkToken } from '../middlewares/checkToken'
import { db } from '../middlewares/dbCrud'



router.get('/',async (request:express.Request,response:express.Response, err)=>{

    if(response.status(200)){
        response.sendFile(path.resolve("src/views/index.html"))}
    else{
        const error = new Error(`Error at router GET '/'`)
        response.send(402).json(error)}
        
})

router.post('/login',signIn,  (request:express.Request, response:express.Response)=>{
   
})


router.post ('/register',signUp, (request:express.Request, response:express.Response)=>{

}) 
router.get('/private',checkToken, (request:express.Request, response:express.Response)=>{
    
   
})

router.get('/profile', checkToken,(request:express.Request, response:express.Response)=>{

})

router.get('*', (request:express.Request, response:express.Response)=>{
    response.json('Página inexistente')

})

export default router