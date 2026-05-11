import cors from "cors";
import * as dotenv from "dotenv";
import express, { Request, Response } from "express";
import { readFile, writeFile } from "fs/promises";
import * as path from "path";
import { Game, Schedule } from "./models/schedule";

// 1. Charger le .env
dotenv.config();

const app = express();
const schedulesFilePath = path.resolve(process.cwd(), "api/data/schedules.json");

async function readSchedules(): Promise<Schedule[]> {
  const fileContent = await readFile(schedulesFilePath, "utf-8");
  return JSON.parse(fileContent) as Schedule[];
}

async function writeSchedules(schedules: Schedule[]): Promise<void> {
  await writeFile(schedulesFilePath, `${JSON.stringify(schedules, null, 4)}\n`, "utf-8");
}

app.use(cors());
app.use(express.json());

app.get("/schedules", async (req: Request, res: Response) => {
  try {
    const schedules = await readSchedules();
    res.json(schedules);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur DB" });
  }
});

app.post("/schedules", async (req: Request, res: Response) => {
  try {
    const { date, games } = req.body as Partial<Schedule>;

    if (!date || !Array.isArray(games) || games.length === 0) {
      return res.status(400).json({
        error: "Le body doit contenir une date et un tableau games non vide.",
      });
    }

    const schedules = await readSchedules();
    const nextSchedule: Schedule = {
      date,
      games: games as Game[],
    };

    await writeSchedules({...nextSchedule, ...schedules });

    return res.status(201).json(nextSchedule);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erreur lors de l'ajout du schedule" });
  }
});

export default app;