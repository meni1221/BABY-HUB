import express, { IRouter, Request, Response } from "express";
import { handleError } from "../../utils/handleError";
import { addBabysitter, getAllBabysitters, getBabysitterById, patchBabysitter, deleteBabysitter } from "../services/BabysitterServices";

const router: IRouter = express.Router();

router.post("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const babysitter = await addBabysitter(req.body);
    res.status(201).json(babysitter);
  } catch (error: any) {
    handleError(res, error.status || 404, error.message);
  }
});

router.get("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const babysitters = await getAllBabysitters();
    res.status(201).json(babysitters);
  } catch (error: any) {
    handleError(res, error.status || 404, error.message);
  }
});

router.get("/:id", async (req: Request, res: Response): Promise<void> => {
  try {
    const babysitter = await getBabysitterById(req.params.id)
    res.status(201).json(babysitter)
  } catch (error:any) {
    handleError(res, error.status || 404, error.message)
  }
});

router.patch("/:id", async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedBabysitter = await patchBabysitter(req.params.id, req.body);
    res.json(updatedBabysitter);
  } catch (error:any) {
    handleError(res, error.status || 404, error.message)
  }
});

router.delete("/:id", async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedBabysitter = await deleteBabysitter(req.params.id);
    res.json(deletedBabysitter);
  } catch (error: any) {
    handleError(res, error.status || 404, error.message)
  }
});
export default router;
