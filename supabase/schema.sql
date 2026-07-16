-- LOYALTY Appointment Booking System
-- Run this in Supabase SQL Editor: https://supabase.com/dashboard

-- Employees table
CREATE TABLE IF NOT EXISTS employees (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  role_en TEXT NOT NULL,
  role_es TEXT NOT NULL,
  image TEXT DEFAULT '',
  specialties TEXT[] DEFAULT '{}',
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Appointments table
CREATE TABLE IF NOT EXISTS appointments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  service_id TEXT NOT NULL,
  service_name TEXT NOT NULL,
  employee_id TEXT NOT NULL REFERENCES employees(id),
  employee_name TEXT NOT NULL,
  employee_email TEXT NOT NULL,
  appointment_date DATE NOT NULL,
  start_time TEXT NOT NULL,
  end_time TEXT NOT NULL,
  notes TEXT DEFAULT '',
  status TEXT DEFAULT 'confirmed' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
  instagram_confirmed BOOLEAN DEFAULT false,
  reminder_sent BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT unique_slot_per_day UNIQUE (appointment_date, start_time)
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_appointments_date ON appointments(appointment_date);
CREATE INDEX IF NOT EXISTS idx_appointments_status ON appointments(status);
CREATE INDEX IF NOT EXISTS idx_appointments_reminder ON appointments(appointment_date, reminder_sent, status);

-- Seed default employees
INSERT INTO employees (id, name, email, role_en, role_es, image, specialties) VALUES
  ('marco', 'Marco Rivera', 'marco@loyaltystudio.com', 'Master Barber', 'Barbero Maestro', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80', ARRAY['haircuts', 'styling']),
  ('sofia', 'Sofia Mendez', 'sofia@loyaltystudio.com', 'Senior Stylist', 'Estilista Senior', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80', ARRAY['styling', 'beauty']),
  ('diego', 'Diego Santos', 'diego@loyaltystudio.com', 'Tattoo Artist', 'Artista de Tatuajes', 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80', ARRAY['tattoos']),
  ('luna', 'Luna Torres', 'luna@loyaltystudio.com', 'Piercing Specialist', 'Especialista en Piercings', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80', ARRAY['piercings']),
  ('valentina', 'Valentina Cruz', 'valentina@loyaltystudio.com', 'Beauty Expert', 'Experta en Belleza', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80', ARRAY['beauty', 'styling'])
ON CONFLICT (id) DO NOTHING;

-- Row Level Security
ALTER TABLE employees ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;

-- Public read active employees
CREATE POLICY "Public can read active employees"
  ON employees FOR SELECT
  USING (active = true);

-- Service role handles all writes (via API with service key)
CREATE POLICY "Service role full access employees"
  ON employees FOR ALL
  USING (auth.role() = 'service_role');

CREATE POLICY "Service role full access appointments"
  ON appointments FOR ALL
  USING (auth.role() = 'service_role');
