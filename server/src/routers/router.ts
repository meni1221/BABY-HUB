import express, { IRouter, NextFunction, Request, Response }  from 'express'
import { handleError } from '../../utils/handleError';
import BabysitterController from "../controllers/BabysitterController"
import AuthController from "../controllers/authController"

const router:IRouter = express.Router()


router.use("/babysitter", BabysitterController)

router.use("/auth", AuthController)


export default router