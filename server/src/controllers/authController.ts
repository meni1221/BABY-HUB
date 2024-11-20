import express, { IRouter, Request, Response } from "express";
import { logout } from "../services/authService";

const router: IRouter = express.Router();

router.post("/login/babysitter")

router.post("/login/parent")

router.post("/logout", (req: Request, res: Response): void => {
	try {
		logout(res);
		res.status(200).json({ message: "Logged out successfully👍🆗" })
	} catch (error: any) {
		console.error(error.message);
	}
})

export default router