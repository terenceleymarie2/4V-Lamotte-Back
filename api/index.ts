import { get, put } from '@vercel/blob';
import cors from "cors";
import * as dotenv from "dotenv";
import express, { Request, Response } from "express";
import { readFile } from "fs/promises";
import * as path from "path";
import { Schedule } from "./models/schedule";
import { error } from "console";

// 1. Charger le .env
dotenv.config();

const app = express();
const schedulesFilePath = path.resolve(process.cwd(), "api/data/schedules.json");

async function readSchedules(): Promise<Schedule[]> {
  const fileContent = await readFile(schedulesFilePath, "utf-8");
  return JSON.parse(fileContent) as Schedule[];
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
    const result = await get("schedules", { access: 'private' });
      if (result?.statusCode !== 200) {
    return res.status(404).json({ error: "Not found", errorDetails: `Blob storage returned status code ${result?.statusCode}` });
  }

  return res.status(200)
    .header('Content-Type', result.blob.contentType)
    .header("X-Content-Type-Options", "nosniff")
    .json(result.stream);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la lecture des données", errorDetails: error instanceof Error ? error.message : String(error) });
  }
});

// Mettre à jour les données
app.post('/v2/schedules', async (req: Request, res: Response) => {
  try {
    const newSchedules = req.body;
    await put("schedules", newSchedules, { access: 'private' });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de l'écriture des données", errorDetails: error instanceof Error ? error.message : String(error) });
  }
});

export default app;