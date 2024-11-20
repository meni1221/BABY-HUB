import { CookieOptions, Request, Response } from "express";
import { handleBadRequest } from "../../utils/handleError";

const cookieConfing: CookieOptions = {
	httpOnly: true,
	secure: true,
	sameSite: "strict",
};

interface UserDTO {
	email: string;
	password: string;
};

const loginNanny = (user: UserDTO, res: Response) => {
	try {
		if (!user.email || user.password) {
			throw new Error("Missing required fields✍️");
		}
		// const findUser = await IBabysitter.fi 






	} catch (error) {

	}
}

const loginParent = () => { }

const logout = (res: Response) => {
	try {
		res.clearCookie("auth_token", cookieConfing);
		console.log("User logged out and cookie cleared👋");
	} catch (error: any) {
		error.status = 500;
		handleBadRequest("Logout error😥", error)
	}
}

export {
	loginNanny,
	loginParent,
	logout
}