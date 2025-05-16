import express, { IRouter, Request, Response } from 'express';
import { loginBabySitter, loginParent, logout } from '../services/authService';
import { handleError } from '../../utils/handleError';
import { verifyUserForLogin } from '../../helpers/jwt';

const router: IRouter = express.Router();

// login the bayb sitter
router.post('/login/babysitter', async (req: Request, res: Response): Promise<void> => {
  try {
    const babysitter = req.body;
    const realNanny = await loginBabySitter(babysitter, res);
    res.json(realNanny);
  } catch (error: any) {
    console.error(error.message);
    handleError(res, error.status, error.message);
  }
});

// Login the parents
router.post('/login/parent', async (req: Request, res: Response): Promise<void> => {
  try {
    const parent = req.body;
    const realParent = await loginParent(parent, res);
    res.json(realParent);
  } catch (error: any) {
    console.error(error.message);
    handleError(res, error.status, error.message);
  }
});

// Logout ib all the people
router.post('/logout', (req: Request, res: Response): void => {
  try {
    logout(res);
    res.status(200).json({ message: 'Logged out successfully👍🆗' });
  } catch (error: any) {
    console.error(error.message);
  }
});

router.post('/verifyUser/:role', async (req: Request, res: Response):  Promise<void> => {
  try {
    const {role} = req.params
    const user = await verifyUserForLogin(req,res,role);
    
    res.json(user);
  } catch (error: any) {
    console.error(error.message);
  }
});

export default router;
