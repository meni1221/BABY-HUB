import express, { IRouter, Request, Response } from "express";
import { allParents, addNewParents } from "../services/ParentsService";
import { handleError } from "../../utils/handleError";

const router: IRouter = express.Router();

router.get("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const parents = await allParents();
    res.json(parents);
  } catch (error: any) {
    handleError(res, error.status || 404, error.message);
  }
});

router.post("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const parent = await addNewParents(req.body);
    res.status(201).json(parent);
  } catch (error: any) {
    handleError(res, error.status || 400, error.message);
  }
});

export default router;
