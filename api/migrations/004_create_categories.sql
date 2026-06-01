-- PostgreSQL schema generated from api/models/schedule.ts
-- Schedule { date: string, games: Game[] }
-- Game { category, hour, field, teamA, teamB, score }

BEGIN;

CREATE TABLE IF NOT EXISTS categories (
  id BIGSERIAL PRIMARY KEY,
  competition VARCHAR(255) NOT NULL,
  category TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

INSERT INTO categories (competition, category)
VALUES
  ('2026_Lamotte', 'Moustiques Elite'),
  ('2026_Lamotte', 'Poussins Elite'),
  ('2026_Lamotte', 'Poussins 1'),
  ('2026_Lamotte', 'Poussins 2'),
  ('2026_Lamotte', 'Poussins 3'),
  ('2026_Lamotte', 'Poussins 4'),
  ('2026_Lamotte', 'Benjamins Elite'),
  ('2026_Lamotte', 'Benjamins 1'),
  ('2026_Lamotte', 'Benjamins 2'),
  ('2026_Lamotte', 'Benjamins 3'),
  ('2026_Lamotte', 'Benjamins 4'),
  ('2026_Lamotte', 'Minimes Elite'),
  ('2026_Lamotte', 'Minimes 1'),
  ('2026_Lamotte', 'Minimes 2'),
  ('2026_Lamotte', 'Minimes 3'),
  ('2026_Lamotte', 'Minimes 4'),
  ('2026_Lamotte', 'Minimes 5'),
  ('2026_Lamotte', 'Cadets Elite'),
  ('2026_Lamotte', 'Cadets 1'),
  ('2026_Lamotte', 'Cadets 2'),
  ('2026_Lamotte', 'Cadets 3'),
  ('2026_Lamotte', 'Cadets 4'),
  ('2026_Lamotte', 'Cadets 5'),
  ('2026_Lamotte', 'Espoirs Elite'),
  ('2026_Lamotte', 'Espoirs Féminines Elite'),
  ('2026_Lamotte', 'Espoirs 1'),
  ('2026_Lamotte', 'Club Excellence Elite'),
  ('2026_Lamotte', 'Club Excellence 1'),
  ('2026_Lamotte', 'Club Excellence 2'),
  ('2026_Lamotte', 'Club Excellence 3'),
  ('2026_Lamotte', 'Club Excellence 4'),
  ('2026_Lamotte', 'Club Excellence 5'),
  ('2026_Lamotte', 'Club Excellence 6'),
  ('2026_Lamotte', 'Club Elite'),
  ('2026_Lamotte', 'Club 1'),
  ('2026_Lamotte', 'Club 2'),
  ('2026_Lamotte', 'Club 3'),
  ('2026_Lamotte', 'Club 4'),
  ('2026_Lamotte', 'Club 5'),
  ('2026_Lamotte', 'Club Feminine Elite'),
  ('2026_Lamotte', 'Coupe de France Neo 2 Minime Cadet'),
  ('2026_Lamotte', 'Coupe de France Mixte'),
  ('2026_Lamotte', 'Coupe de France Feminine');


INSERT INTO categories (competition, category)
VALUES
  ('2026_Cluny', 'AF'),
  ('2026_Cluny', 'AEF'),
  ('2026_Cluny', 'PF'),
  ('2026_Cluny', 'PEFF'),
  ('2026_Cluny', 'AM1'),
  ('2026_Cluny', 'AM2');

COMMIT;
