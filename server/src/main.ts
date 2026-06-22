import 'reflect-metadata';
import 'dotenv/config';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';
import { json, NextFunction, Request, Response, urlencoded } from 'express';
import mongoose from 'mongoose';
import { createServer } from 'net';
import { AppModule } from './app.module';
import loadInitialData from './initailData/initailData';

const START_PORT = Number(process.env.PORT || 8000);
const MAX_PORT_ATTEMPTS = 10;
const logger = new Logger('Bootstrap');

const securityHeaders = (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=()',
  );
  next();
};

const isPortAvailable = (port: number): Promise<boolean> =>
  new Promise((resolve) => {
    const server = createServer();

    server.once('error', () => resolve(false));
    server.once('listening', () => {
      server.close(() => resolve(true));
    });

    server.listen(port);
  });

const findAvailablePort = async (
  port: number,
  attemptsLeft = MAX_PORT_ATTEMPTS,
): Promise<number> => {
  if (await isPortAvailable(port)) {
    return port;
  }

  if (attemptsLeft <= 0) {
    throw new Error(`No available port found from ${START_PORT}`);
  }

  logger.warn(`WARN port ${port} is already in use. Trying ${port + 1}`);
  return findAvailablePort(port + 1, attemptsLeft - 1);
};

const bootstrap = async () => {
  logger.log('INFO starting Nest server');
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
    credentials: true,
  });

  app.use(securityHeaders);
  app.use(json({ limit: process.env.JSON_BODY_LIMIT || '1mb' }));
  app.use(urlencoded({ extended: true, limit: '1mb' }));
  app.use(cookieParser());

  logger.log('INFO connecting to MongoDB');
  await mongoose.connect(process.env.MONGO_URI || '');
  logger.log('INFO MongoDB connected');

  await loadInitialData();

  const activePort = await findAvailablePort(START_PORT);
  await app.listen(activePort);
  logger.log(`INFO server is running on http://localhost:${activePort}`);
};

bootstrap().catch((error: unknown) => {
  const normalizedError =
    error instanceof Error ? error : new Error(String(error));
  logger.error('ERROR failed to start server', normalizedError.stack);
  process.exit(1);
});
