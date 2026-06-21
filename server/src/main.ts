import 'reflect-metadata';
import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import { AppModule } from './app.module';
import loadInitialData from './initailData/initailData';

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 8000;

  app.enableCors({
    origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
    credentials: true,
  });

  app.use(cookieParser());

  await mongoose.connect(process.env.MONGO_URI || '');
  await loadInitialData();

  await app.listen(port);
  console.log(`Server is running on http://localhost:${port}`);
};

bootstrap().catch((error: unknown) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});
