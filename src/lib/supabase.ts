import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_KEY as string;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.warn('VITE_SUPABASE_URL or VITE_SUPABASE_KEY not set');
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);