-- PostgreSQL schema generated from api/models/schedule.ts
-- Schedule { date: string, games: Game[] }
-- Game { category, hour, field, teamA, teamB, score }

BEGIN;

CREATE TABLE IF NOT EXISTS schedules (
  id BIGSERIAL PRIMARY KEY,
  date TIMESTAMPTZ NOT NULL,
  category TEXT NOT NULL,
  hour TEXT NOT NULL,
  field TEXT NOT NULL,
  team_a TEXT NOT NULL,
  team_b TEXT NOT NULL,
  score TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMIT;
