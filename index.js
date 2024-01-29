import express, { urlencoded, json } from "express";
import compression from "compression";
import winston from "winston";
import config from "./config.js";
import { router as apiRouter } from "./route.js";

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "combined.log" }),
  ],
});
const { PORT } = config;
const app = express();
app.use(urlencoded({ extended: true }));
app.use(json());
app.use(compression());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use("/api", apiRouter);
app.listen(PORT, () => {
  console.log(`Application listening on port ${PORT}!`);
});
