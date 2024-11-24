import express, { Express } from 'express';
import 'dotenv/config';
import mongoose from 'mongoose';
import router from './src/routers/router';
import cookieParser from 'cookie-parser';
import loadInitialData from './src/initailData/initailData';
import cors from 'cors';

const app: Express = express();

loadInitialData().catch(console.error);

app.use(
  cors({
    origin: 'http://localhost:5174',
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use(router);

mongoose
  .connect(process.env.MONGO_URI || '')
  .then(() => {
    console.log('Connected to MongoDB Atlas');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

app.listen(process.env.PORT || 8000, () => {
  console.log(` listen to port http://localhost:${process.env.PORT || 8000} `);
});
