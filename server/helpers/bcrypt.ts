import bcrypt from "bcrypt";

const generateUserPassword = (password: string) => {
	return bcrypt.hashSync(password, 10)
};

const comparePassword = (password: string, otherPassword: string) => {
	return bcrypt.compareSync(password, otherPassword)
};

export { generateUserPassword, comparePassword }