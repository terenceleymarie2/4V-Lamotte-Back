import cors from "cors";
import * as dotenv from "dotenv";
import express, { Request, Response } from "express";
import { readFile, writeFile } from "fs/promises";
import * as path from "path";
import { Game, Schedule } from "./models/schedule";
import { kv } from '@vercel/kv';

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

// Récupérer les données
app.get('/v2/schedules', async (req: Request, res: Response) => {
  try {
    const schedules = await kv.get('schedules');
    // Si la base est vide, on renvoie un tableau vide
    res.json(schedules || []);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la lecture des données", errorDetails: error instanceof Error ? error.message : String(error) });
  }
});

// Mettre à jour les données
app.post('/v2/schedules', async (req: Request, res: Response) => {
  try {
    const newSchedules = req.body;
    await kv.set('schedules', newSchedules);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de l'écriture des données", errorDetails: error instanceof Error ? error.message : String(error) });
  }
});

export default app;