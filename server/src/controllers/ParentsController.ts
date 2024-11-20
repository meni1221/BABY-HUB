import express, { IRouter, Request, Response } from "express";
import { allParents } from "../services/ParentsService";
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

export default router;
