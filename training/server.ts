import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import logger from "morgan";
import appRouter from "./app/app";

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(helmet());
app.use(express.json());
app.use(logger("dev"));

app.use("/", appRouter);

export default app;
