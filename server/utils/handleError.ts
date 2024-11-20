import { Response } from "express";

const handleError = (res: Response, status: number, message: string): Response => {
  return res.status(status).json({
    error: {
      status,
      message,
    },
  });
};


const handleBadRequest = async (validator: string, error: any) => {
  const errorMessage = `${validator} Error: ${error.message}`;
  const Error = {
    ...error,
    message: errorMessage,
    status: error.status || 400,
  };
  return Promise.reject(Error); 
};

export { handleError,handleBadRequest};