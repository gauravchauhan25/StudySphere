/*
  # StudySphere Notes Sharing System

  1. New Tables
    - `notes`
      - `id` (uuid, primary key)
      - `title` (text) - Note title/description
      - `subject` (text) - Subject name
      - `semester` (integer) - Semester number (1-6)
      - `file_name` (text) - Original filename
      - `file_path` (text) - Storage path reference
      - `file_type` (text) - File extension/type
      - `file_size` (integer) - File size in bytes
      - `uploaded_by` (uuid) - References auth.users
      - `created_at` (timestamptz)
      
  2. Security
    - Enable RLS on `notes` table
    - Policy: Authenticated users can read all notes
    - Policy: Authenticated users can insert their own notes
    - Policy: Users can only delete their own notes
    
  3. Storage
    - Create `notes` bucket for file storage
    - Enable public access for reading files
    - Restrict uploads to authenticated users
*/

CREATE TABLE IF NOT EXISTS notes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL DEFAULT '',
  subject text NOT NULL,
  semester integer NOT NULL CHECK (semester >= 1 AND semester <= 6),
  file_name text NOT NULL,
  file_path text NOT NULL,
  file_type text NOT NULL,
  file_size integer NOT NULL DEFAULT 0,
  uploaded_by uuid REFERENCES auth.users(id) DEFAULT auth.uid(),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE notes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view all notes"
  ON notes FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can upload notes"
  ON notes FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = uploaded_by);

CREATE POLICY "Users can delete own notes"
  ON notes FOR DELETE
  TO authenticated
  USING (auth.uid() = uploaded_by);

CREATE POLICY "Users can update own notes"
  ON notes FOR UPDATE
  TO authenticated
  USING (auth.uid() = uploaded_by)
  WITH CHECK (auth.uid() = uploaded_by);

INSERT INTO storage.buckets (id, name, public) 
VALUES ('notes', 'notes', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Authenticated users can upload notes files"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'notes');

CREATE POLICY "Anyone can view notes files"
  ON storage.objects FOR SELECT
  TO authenticated
  USING (bucket_id = 'notes');

CREATE POLICY "Users can delete own notes files"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'notes' AND auth.uid() = owner);