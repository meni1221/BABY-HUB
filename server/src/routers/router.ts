import express, { IRouter, NextFunction, Request, Response }  from 'express'
import { handleError } from '../../utils/handleError';
import BabysitterController from "../controllers/BabysitterController"
import AuthController from "../controllers/authController"
import ParentsControler from "../controllers/ParentsController"
import orderController from "../controllers/orderController"

const router:IRouter = express.Router()

router.use("/orders", orderController)
router.use("/babysitter", BabysitterController)
router.use("/parents", ParentsControler);

router.use("/auth", AuthController)


export default router