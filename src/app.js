import express from "express";
import http from "http";
import mongoose from "mongoose";
import configApp from "./application/express.js";
import configServer from "./application/server.js";
import connectionDb from "./application/connection.js";
import routesApp from "./routers/index.js";

import errorHandler from "./middlewares/error.middleware.js";
import config from "../config/config.js";

const PORT = process.env.PORT || 8000;
const app = express();
const server = http.createServer(app);

configApp(app);
app.use("/static", express.static("./public"));
app.use("/images", express.static("./public/images"));
app.use("/uploads", express.static("./public/uploads"));

configServer(app, mongoose, server, config).startServer();

connectionDb(mongoose, config, {
  autoIndex: true,
  connectTimeoutMS: 1000,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
  family: 4,
}).connectToMongo();
routesApp(app);

app.use(errorHandler);

server.listen(PORT, () => {
  console.log("Server Running.....");
});
