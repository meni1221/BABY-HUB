import express, { IRouter, NextFunction, Request, Response }  from 'express'
import { handleError } from '../../utils/handleError';

const router:IRouter = express.Router()



router.use((req:Request,res:Response)=>{
handleError(res,404,"Not found")
})


export default router