import express, { IRouter, Request, Response } from "express";
import { handleError } from "../../utils/handleError";
import {addBabysitter} from "../services/BabysitterServices"

const router: IRouter = express.Router()

router.post("/", async(req:Request, res:Response): Promise<void> => {
    try {
        const babysitter = await addBabysitter(req.body)
        res.status(201).json(babysitter)
    } catch (error: any) {
        handleError(res, error.status || 404, error.message )
    }
})

router.get("/", async(req:Request, res:Response): Promise<void> => {
    try {
        
    } catch (error) {
        
    }
})

router.get("/:id", async(req:Request, res:Response): Promise<void> => {
    try {
        
    } catch (error) {
        
    }
})

router.patch("/:id", async(req:Request, res:Response): Promise<void> => {
    try {
        
    } catch (error) {
        
    }
})

router.delete("/:id", async(req:Request, res:Response): Promise<void> => {
    try {
        
    } catch (error) {
        
    }
})
export default router;