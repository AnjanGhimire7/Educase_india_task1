import { app } from "./app.js";
import http from "http";
import dotenv from "dotenv";
dotenv.config({
  path: "./.env",
});

const createServer = http.createServer(app);
createServer.listen(process.env.PORT || 5000, () => {
  console.log(`server is running on the port:${process.env.PORT}`);
});
