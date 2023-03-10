import dotenv from 'dotenv'
dotenv.config()


interface IConfig {
    SECRET:any
}
export const config:IConfig = {
    SECRET:process.env.SECRET
}