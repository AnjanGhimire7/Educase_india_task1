import cors from "cors";
import helmet from "helmet";
import express from "express";
import morganMiddleware from "./logger/morgan.logger.js";
import { errorHandler } from "./middleware/error.middleware.js";
const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(morganMiddleware);
app.use(errorHandler);
app.use(helmet());




//import routes

import schoolRouter from './routes/school.route.js'

//route declatration
app.use("/api/v1/school",schoolRouter)
export { app };
