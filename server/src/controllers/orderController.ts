import express, { IRouter, Request, Response } from 'express';
import { handleError } from '../../utils/handleError';
import {
  addOrder,
  getAllOrders,
  getOrderById,
  patchOrder,
  deleteOrder,
} from '../services/orderService';

const router: IRouter = express.Router();

router.post('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const order = await addOrder(req.body);
    res.status(201).json(order);
  } catch (error: any) {
    handleError(res, error.status || 404, error.message);
  }
});

router.get('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const orders = await getAllOrders();
    res.status(201).json(orders);
  } catch (error: any) {
    handleError(res, error.status || 404, error.message);
  }
});

router.get('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const order = await getOrderById(req.params.id);
    res.status(201).json(order);
  } catch (error: any) {
    handleError(res, error.status || 404, error.message);
  }
});

router.patch('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedOrder = await patchOrder(req.params.id, req.body);
    res.json(updatedOrder);
  } catch (error: any) {
    handleError(res, error.status || 404, error.message);
  }
});

router.delete('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedOrder = await deleteOrder(req.params.id);
    res.json(deletedOrder);
  } catch (error: any) {
    handleError(res, error.status || 404, error.message);
  }
});
export default router;
