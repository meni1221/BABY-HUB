import express, { Express, Request, Response } from "express";
import "dotenv/config";


const app: Express = express();


app.listen(process.env.PORT || 8000, () => {
  console.log(` listen to port http://localhost:${process.env.PORT || 8000} `);
});
