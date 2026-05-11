import * as cors from "cors";
import * as dotenv from "dotenv";
import express, { Request, Response } from "express";
import * as data  from "./data/schedules.json";

// 1. Charger le .env
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/schedules", async (req: Request, res: Response) => {
  try {

    const schedules = data;
    res.json(schedules);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur DB" });
  }
});

export default app;