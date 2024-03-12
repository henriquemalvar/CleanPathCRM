import express from "express";
import cors from "cors";
import morgan from "morgan";
import routes from "./routes";
import { createTables } from "@config/createTables";
import { AppError } from "@shared/errors/AppError";
import { Request, Response, NextFunction } from "express";

const app = express();

createTables().catch((error) => {
  console.error("Error creating tables:", error);
  throw new AppError("Error creating tables", 500);
});

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use(routes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: "error",
      message: err.message,
    });
  }

  return res.status(500).json({
    status: "error",
    message: "Internal server error",
  });
});

app.get("/", (req, res) => {
  res.send("API Running");
});

export default app;
