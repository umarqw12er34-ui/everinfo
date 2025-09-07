/*
  # Create portfolio projects table

  1. New Tables
    - `portfolio_projects`
      - `id` (uuid, primary key)
      - `title` (text, required)
      - `description` (text, required)
      - `image_url` (text, optional)
      - `demo_url` (text, optional)
      - `github_url` (text, optional)
      - `technologies` (text array)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `portfolio_projects` table
    - Add policy for public read access
    - Add policy for authenticated users to manage projects
*/

CREATE TABLE IF NOT EXISTS portfolio_projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  image_url text,
  demo_url text,
  github_url text,
  technologies text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE portfolio_projects ENABLE ROW LEVEL SECURITY;

-- Allow public read access to portfolio projects
CREATE POLICY "Anyone can view portfolio projects"
  ON portfolio_projects
  FOR SELECT
  TO public
  USING (true);

-- Allow authenticated users to insert projects (for admin functionality)
CREATE POLICY "Authenticated users can insert projects"
  ON portfolio_projects
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Allow authenticated users to update projects
CREATE POLICY "Authenticated users can update projects"
  ON portfolio_projects
  FOR UPDATE
  TO authenticated
  USING (true);

-- Allow authenticated users to delete projects
CREATE POLICY "Authenticated users can delete projects"
  ON portfolio_projects
  FOR DELETE
  TO authenticated
  USING (true);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_portfolio_projects_updated_at
  BEFORE UPDATE ON portfolio_projects
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();