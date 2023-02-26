import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import compression from 'compression';
import helmet from 'helmet';
import * as initDB from './src/config/db';


initDB;
dotenv.config();

import userRouter from './src/resources/user/user.route'
import productRouter from './src/resources/product/product.route'
import ErrorHandler from "./src/middleware/error/error.handler";

const app = express();




app.use(helmet());
app.use(cookieParser());
app.use(cors());
app.use(express.json());

app.use('/api', userRouter)
app.use('/api', productRouter)

app.use(compression())
app.use(ErrorHandler)

const port: string | number = process.env.PORT ? Number(process.env.PORT) : 5000;

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});







