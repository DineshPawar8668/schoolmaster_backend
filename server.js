import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { PORT } from "./src/global.js";
import router from "./src/routes/index.js";
import { globalErrorHandler } from "./src/middlewares/errorHandler.js";
import dbConnection from "./src/db/connectDB.js";
import bodyParser from "body-parser";
import morgan from "morgan";
import cors from "cors";
const app = express();
app.use(cors());
app.use(bodyParser.json()); // to parse JSON
app.use(bodyParser.urlencoded({ extended: true })); // to parse HTML form data
app.use(morgan("dev"));
await dbConnection();

app.use("/api", router);
app.use(globalErrorHandler);

app.listen(PORT, () => {
  console.log(`Server listen on port ${PORT}`);
});
