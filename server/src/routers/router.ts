import express, { IRouter, NextFunction, Request, Response }  from 'express'
import { handleError } from '../../utils/handleError';
import BabysitterController from "../controllers/BabysitterController"
import orderController from "../controllers/orderController"

const router:IRouter = express.Router()

router.use("/orders", orderController)
router.use("/babysitter", BabysitterController)
router.use((req:Request,res:Response)=>{
handleError(res,404,"Not found")
})


export default router