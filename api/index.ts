import { neon } from "@neondatabase/serverless";
import { put } from '@vercel/blob';
import cors from 'cors';
import { format } from "date-fns";
import * as dotenv from "dotenv";
import express, { Request, Response } from 'express';
import { readFile } from "fs/promises";
import * as path from "path";
import { ScheduleModel } from "./models/schedule";
import { ScheduleResponse } from "./responses/schedule";

// 1. Charger le .env
dotenv.config();

const connectionString = `postgresql://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}/${process.env.PGDATABASE}?sslmode=require`;
const sql = neon(connectionString);

const app = express();
const schedulesFilePath = path.resolve(process.cwd(), "api/data/schedules.json");

async function readSchedules(): Promise<any[]> {
  const fileContent = await readFile(schedulesFilePath, "utf-8");
  return JSON.parse(fileContent);
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
    const result: ScheduleModel[] = await sql`SELECT * FROM schedules ORDER BY date desc` as ScheduleModel[];
    const reduceResult = result.reduce((acc: ScheduleResponse[], row: ScheduleModel) => {
      const formatedDate = format(new Date(row.date), "EEEE dd/MM/yyyy");
      const existingDate = acc.find(item => item.date === formatedDate);
      const game = {
        id: row.id,
        category: row.category,
        hour: row.hour,
        field: row.field,
        teamA: row.team_a,
        teamB: row.team_b,
        score: row.score
      };
      if (existingDate) {
        existingDate.games.push(game);
      } else {
        acc.push({ date: formatedDate, games: [game] });
      }
      return acc;
      
    }, []);
    res.json(reduceResult);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur lors de la lecture SQL" });
  }
});

// Mettre à jour les données
app.post('/v2/schedules', async (req: Request, res: Response) => {
  try {
    const newSchedule = req.body;
    await sql`INSERT INTO schedules (date, category, hour, field, team_a, team_b, score) VALUES (${newSchedule.date}, ${newSchedule.category}, ${newSchedule.hour}, ${newSchedule.field}, ${newSchedule.teamA}, ${newSchedule.teamB}, ${newSchedule.score})`;
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de l'écriture des données", errorDetails: error instanceof Error ? error.message : String(error) });
  }
});

app.patch('/v2/schedules/:id', async (req: Request, res: Response) => {
  try {
    const newSchedule = req.body;
    await sql`UPDATE schedules SET (date, category, hour, field, team_a, team_b, score) = (${newSchedule.date}, ${newSchedule.category}, ${newSchedule.hour}, ${newSchedule.field}, ${newSchedule.teamA}, ${newSchedule.teamB}, ${newSchedule.score}) WHERE id = ${req.params.id}`;
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de l'écriture des données", errorDetails: error instanceof Error ? error.message : String(error) });
  }
});

app.delete('/v2/schedules/:id', async (req: Request, res: Response) => {
  try {
    await sql`DELETE FROM schedules WHERE id = ${req.params.id}`;
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la suppression des données", errorDetails: error instanceof Error ? error.message : String(error) });
  }
});

app.get("/_health", async (req: Request, res: Response) => {
  try {
    await sql`SELECT * FROM schedules ORDER BY date desc`;
    res.json({ status: "ok" });
  } catch (error) {
    res.status(500).json({ status: "error", errorDetails: error instanceof Error ? error.message : String(error) });
  }
});

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//     console.log('---');
//     console.log(`🚀 Serveur démarré avec succès !`);
//     console.log(`📡 URL locale : http://localhost:${PORT}`);
//     console.log(`🗄️  Base de données : Neon PostgreSQL ${connectionString}`);
//     console.log('---');
//   });


export default app;