import express, { IRouter, NextFunction, Request, Response } from "express";
import { handleError } from "../../utils/handleError";
import ParentsControler from "../controllers/ParentsController";
const router: IRouter = express.Router();

router.use("/parents", ParentsControler);

router.use((req: Request, res: Response) => {
  handleError(res, 404, "Not found");
});

export default router;
