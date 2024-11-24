import express, { IRouter, Request, Response } from 'express';
import { handleError } from '../../utils/handleError';
import {
  addBabysitter,
  getAllBabysitters,
  getBabysitterById,
  patchBabysitter,
  deleteBabysitter,
  addReviewToBabysitter,
  getBabysitterReviews,
  deleteReviewFromBabysitter,
} from '../services/BabysitterServices';

const router: IRouter = express.Router();

router.post('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const babysitter = await addBabysitter(req.body);
    res.status(201).json(babysitter);
  } catch (error: any) {
    handleError(res, error.status || 404, error.message);
  }
});

router.get('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const babysitters = await getAllBabysitters();
    res.status(201).json(babysitters);
  } catch (error: any) {
    handleError(res, error.status || 404, error.message);
  }
});

router.get('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const babysitter = await getBabysitterById(req.params.id);
    res.status(201).json(babysitter);
  } catch (error: any) {
    handleError(res, error.status || 404, error.message);
  }
});

router.patch('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedBabysitter = await patchBabysitter(req.params.id, req.body);
    res.json(updatedBabysitter);
  } catch (error: any) {
    handleError(res, error.status || 404, error.message);
  }
});

router.delete('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedBabysitter = await deleteBabysitter(req.params.id);
    res.json(deletedBabysitter);
  } catch (error: any) {
    handleError(res, error.status || 404, error.message);
  }
});

router.post('/:id/reviews', async (req: Request, res: Response): Promise<void> => {
  try {
    const babysitterId = req.params.id;
    const review = req.body;
    const updatedBabysitter = await addReviewToBabysitter(babysitterId, review);
    res.status(201).json(updatedBabysitter);
  } catch (error: any) {
    handleError(res, error.status || 404, error.message);
  }
});

router.get('/:id/reviews', async (req: Request, res: Response): Promise<void> => {
  try {
    const babysitterId = req.params.id;
    const reviews = await getBabysitterReviews(babysitterId);
    res.status(200).json(reviews);
  } catch (error: any) {
    handleError(res, error.status || 404, error.message);
  }
});

router.delete('/:id/reviews/:reviewId', async (req: Request, res: Response): Promise<void> => {
  try {
    const babysitterId = req.params.id;
    const reviewId = req.params.reviewId;
    const updatedBabysitter = await deleteReviewFromBabysitter(babysitterId, reviewId);
    res.json(updatedBabysitter);
  } catch (error: any) {
    handleError(res, error.status || 404, error.message);
  }
});
export default router;
