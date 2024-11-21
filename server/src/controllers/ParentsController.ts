import express, { IRouter, Request, Response } from "express";
import {
  allParents,
  addNewParents,
  updateParents,
  deleteParents,
} from "../services/ParentsService";
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

router.patch("/:id", async (req: Request, res: Response): Promise<void> => {
  try {
    const updateParent = await updateParents(req.params.id, req.body);
    res.json(updateParent);
  } catch (error: any) {
    handleError(res, error.status || 400, error.message);
  }
});

router.delete("/:id", async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await deleteParents(req.params.id);
    res.json(result);
  } catch (error: any) {
    handleError(res, error.status || 404, error.message);
  }
});

export default router;
