import "express-async-errors";
import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express();
import { StatusCodes } from "http-status-codes";
import morgan from "morgan";
import cookieParser from "cookie-parser";

// Middlewares
import errorHandlerMiddleware from "./middlewares/errorHandlerMiddleware.js";
import { protectRoute } from "./middlewares/authMiddleware.js";

// Routes ---
import authRoute from "./routes/authRoute.js";
import userRoute from "./routes/userRoute.js";
import masterRoute from "./routes/masterRoute.js";

if (process.env.APP_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(cookieParser());
app.use(express.json());

// API starts ---
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/masters", protectRoute, masterRoute);
app.use("/api/v1/users", protectRoute, userRoute);
// API ends ---

const port = process.env.APP_PORT || 3001;

app.use("*", (req, res) => {
  res.status(StatusCodes.NOT_FOUND).json({ msg: `not found` });
});

app.use(errorHandlerMiddleware);

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
