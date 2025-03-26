import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Controlla se le variabili d'ambiente sono presenti
if (!supabaseUrl || !supabaseKey) {
  throw new Error('Supabase URL or key is not defined in environment variables');
}

const supabase = createClient(supabaseUrl, supabaseKey);

export { supabase };
