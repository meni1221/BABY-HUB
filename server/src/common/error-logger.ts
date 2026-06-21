import {
  HttpException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';

export const logAndRethrow = (
  logger: Logger,
  message: string,
  error: unknown,
): never => {
  if (error instanceof HttpException) {
    logger.warn(`${message}: ${error.message}`);
    throw error;
  }

  const normalizedError =
    error instanceof Error ? error : new Error(String(error));

  logger.error(message, normalizedError.stack);
  throw new InternalServerErrorException(message);
};
