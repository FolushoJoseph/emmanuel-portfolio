-- ══════════════════════════════════════════════════
-- Emmanuel Joseph Portfolio — Supabase Schema
-- Run this in the Supabase SQL editor
-- ══════════════════════════════════════════════════

-- Projects table
CREATE TABLE IF NOT EXISTS projects (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug        TEXT UNIQUE NOT NULL,
  title       TEXT NOT NULL,
  description TEXT DEFAULT '',
  client      TEXT DEFAULT '',
  role        TEXT DEFAULT '',
  year        INTEGER DEFAULT EXTRACT(YEAR FROM NOW())::INTEGER,
  categories  TEXT[] DEFAULT '{}',
  cover_image TEXT DEFAULT '',
  published   BOOLEAN DEFAULT false,
  sections    JSONB DEFAULT '[]'::JSONB,
  credits     TEXT DEFAULT 'Emmanuel Folusho Joseph',
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Public can only read published projects
CREATE POLICY "Public read published projects"
  ON projects FOR SELECT
  USING (published = true);

-- Service role key bypasses RLS — used by the CMS server actions

-- ── Storage Bucket ──────────────────────────────
INSERT INTO storage.buckets (id, name, public)
VALUES ('portfolio-media', 'portfolio-media', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public reads from the storage bucket
CREATE POLICY "Public read portfolio-media"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'portfolio-media');

-- Uploads are handled server-side with the service role key,
-- so no additional storage write policy is needed for the anon role.
