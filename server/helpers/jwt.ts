import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

interface TokenPayload {
	id: string;
	isAdmin: boolean;
};

const SECRET_KEY = process.env.JWT_SECRET || "fallback_secret_key";

const generateAuthToken = (user: { _id: any; isAdmin: boolean }): string => {
	return jwt.sign(
		{ id: user._id, isAdmin: user.isAdmin },
		SECRET_KEY,
		{
			expiresIn: "h1"
		}
	);
};

const verifyUser = (req: Request, res: Response, next: NextFunction) => {
	if (!req.headers.cookie) {
		return res.status(401).json({
			status: "error",
			message: "Access denied. No cookies provided😔"
		})
	};

	const token = req.cookies['auth_token'];

	if (!token) {
		return res.status(401).json({
			status: "error",
			message: "Access denied. No token provided😔"
		})
	}

	try {
		const decoded = jwt.verify(token, SECRET_KEY, {
			algorithms: ["HS256"]
		}) as TokenPayload;
		(req as any).user = decoded;
		next();

	} catch (error) {
		console.error("Token verification error😖", error);

		if (error instanceof jwt.TokenExpiredError) {
			return res.status(401).json({
				status: "error",
				message: "Token expired. Please log in again🤞"
			});
		}

		if (error instanceof jwt.JsonWebTokenError) {
			return res.status(400).json({
				status: "error",
				message: "Invalid or malformed token🫤"
			});
		}

		return res.status(500).json({
			status: "error",
			message: "Internal error during authentication🤔"
		})
	}
};

const verifyAdmin = (req: Request, res: Response, next: NextFunction) => {
	verifyUser(req, res, () => {
		const user = (req as any).user;

		if (!user || !user.isAdmin) {
			return res.status(403).json({
				status: "error",
				message: "Access denied. Admin privileges required🛑"
			});
		}
		next();
	});
};
export { generateAuthToken, verifyUser, verifyAdmin }