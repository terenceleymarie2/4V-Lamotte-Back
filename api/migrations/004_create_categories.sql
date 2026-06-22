-- PostgreSQL schema generated from api/models/schedule.ts
-- Schedule { date: string, games: Game[] }
-- Game { category, hour, field, teamA, teamB, score }

BEGIN;

CREATE TABLE IF NOT EXISTS categories (
  id BIGSERIAL PRIMARY KEY,
  competition VARCHAR(255) NOT NULL,
  date TIMESTAMPTZ NOT NULL,
  category TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

INSERT INTO categories (competition, date, category)
VALUES
  ('2026_Lamotte', '2026-05-15T00:00:00.000+02:00', 'Moustiques Elite'),
  ('2026_Lamotte', '2026-05-15T00:00:00.000+02:00', 'Poussins Elite'),
  ('2026_Lamotte', '2026-05-15T00:00:00.000+02:00', 'Poussins 1'),
  ('2026_Lamotte', '2026-05-15T00:00:00.000+02:00', 'Poussins 2'),
  ('2026_Lamotte', '2026-05-15T00:00:00.000+02:00', 'Poussins 3'),
  ('2026_Lamotte', '2026-05-15T00:00:00.000+02:00', 'Poussins 4'),
  ('2026_Lamotte', '2026-05-15T00:00:00.000+02:00', 'Benjamins Elite'),
  ('2026_Lamotte', '2026-05-15T00:00:00.000+02:00', 'Benjamins 1'),
  ('2026_Lamotte', '2026-05-15T00:00:00.000+02:00', 'Benjamins 2'),
  ('2026_Lamotte', '2026-05-15T00:00:00.000+02:00', 'Benjamins 3'),
  ('2026_Lamotte', '2026-05-15T00:00:00.000+02:00', 'Benjamins 4'),
  ('2026_Lamotte', '2026-05-15T00:00:00.000+02:00', 'Minimes Elite'),
  ('2026_Lamotte', '2026-05-15T00:00:00.000+02:00', 'Minimes 1'),
  ('2026_Lamotte', '2026-05-15T00:00:00.000+02:00', 'Minimes 2'),
  ('2026_Lamotte', '2026-05-15T00:00:00.000+02:00', 'Minimes 3'),
  ('2026_Lamotte', '2026-05-15T00:00:00.000+02:00', 'Minimes 4'),
  ('2026_Lamotte', '2026-05-15T00:00:00.000+02:00', 'Minimes 5'),
  ('2026_Lamotte', '2026-05-15T00:00:00.000+02:00', 'Cadets Elite'),
  ('2026_Lamotte', '2026-05-15T00:00:00.000+02:00', 'Cadets 1'),
  ('2026_Lamotte', '2026-05-15T00:00:00.000+02:00', 'Cadets 2'),
  ('2026_Lamotte', '2026-05-15T00:00:00.000+02:00', 'Cadets 3'),
  ('2026_Lamotte', '2026-05-15T00:00:00.000+02:00', 'Cadets 4'),
  ('2026_Lamotte', '2026-05-15T00:00:00.000+02:00', 'Cadets 5'),
  ('2026_Lamotte', '2026-05-15T00:00:00.000+02:00', 'Espoirs Elite'),
  ('2026_Lamotte', '2026-05-15T00:00:00.000+02:00', 'Espoirs Féminines Elite'),
  ('2026_Lamotte', '2026-05-15T00:00:00.000+02:00', 'Espoirs 1'),
  ('2026_Lamotte', '2026-05-15T00:00:00.000+02:00', 'Club Excellence Elite'),
  ('2026_Lamotte', '2026-05-15T00:00:00.000+02:00', 'Club Excellence 1'),
  ('2026_Lamotte', '2026-05-15T00:00:00.000+02:00', 'Club Excellence 2'),
  ('2026_Lamotte', '2026-05-15T00:00:00.000+02:00', 'Club Excellence 3'),
  ('2026_Lamotte', '2026-05-15T00:00:00.000+02:00', 'Club Excellence 4'),
  ('2026_Lamotte', '2026-05-15T00:00:00.000+02:00', 'Club Excellence 5'),
  ('2026_Lamotte', '2026-05-15T00:00:00.000+02:00', 'Club Excellence 6'),
  ('2026_Lamotte', '2026-05-15T00:00:00.000+02:00', 'Club Elite'),
  ('2026_Lamotte', '2026-05-15T00:00:00.000+02:00', 'Club 1'),
  ('2026_Lamotte', '2026-05-15T00:00:00.000+02:00', 'Club 2'),
  ('2026_Lamotte', '2026-05-15T00:00:00.000+02:00', 'Club 3'),
  ('2026_Lamotte', '2026-05-15T00:00:00.000+02:00', 'Club 4'),
  ('2026_Lamotte', '2026-05-15T00:00:00.000+02:00', 'Club 5'),
  ('2026_Lamotte', '2026-05-15T00:00:00.000+02:00', 'Club Feminine Elite'),
  ('2026_Lamotte', '2026-05-15T00:00:00.000+02:00', 'Coupe de France Neo 2 Minime Cadet'),
  ('2026_Lamotte', '2026-05-15T00:00:00.000+02:00', 'Coupe de France Mixte'),
  ('2026_Lamotte', '2026-05-15T00:00:00.000+02:00', 'Coupe de France Feminine');


INSERT INTO categories (competition, date, category)
VALUES
  ('2026_Cluny', '2026-06-05T00:00:00.000+02:00', 'AF'),
  ('2026_Cluny', '2026-06-05T00:00:00.000+02:00', 'AEF'),
  ('2026_Cluny', '2026-06-05T00:00:00.000+02:00', 'PF'),
  ('2026_Cluny', '2026-06-05T00:00:00.000+02:00', 'PEFF'),
  ('2026_Cluny', '2026-06-05T00:00:00.000+02:00', 'AM1'),
  ('2026_Cluny', '2026-06-05T00:00:00.000+02:00', 'AM2');

INSERT INTO categories (competition, date, category)
VALUES
  ('2026_Jardy', '2026-06-26T00:00:00.000+02:00', 'AMAT 1'),
  ('2026_Jardy', '2026-06-26T00:00:00.000+02:00', 'AMAT 2'),
  ('2026_Jardy', '2026-06-26T00:00:00.000+02:00', 'AMAT 3'),
  ('2026_Jardy', '2026-06-26T00:00:00.000+02:00', 'AMAT 4'),
  ('2026_Jardy', '2026-06-26T00:00:00.000+02:00', 'AMAT E'),
  ('2026_Jardy', '2026-06-26T00:00:00.000+02:00', 'Region''s Cup CL'),
  ('2026_Jardy', '2026-06-26T00:00:00.000+02:00', 'Region''s Cup CA'),
  ('2026_Jardy', '2026-06-26T00:00:00.000+02:00', 'POU'),
  ('2026_Jardy', '2026-06-26T00:00:00.000+02:00', 'PRO'),
  ('2026_Jardy', '2026-06-26T00:00:00.000+02:00', 'PRO ELITE');

COMMIT;
