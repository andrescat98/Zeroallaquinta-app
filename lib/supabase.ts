import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://vyhzhwvrivovhspyefpb.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY

if (!supabaseKey) {
  throw new Error('La chiave SUPABASE_KEY non è definita. Verifica le variabili d\'ambiente.');
}

export const supabase = createClient(supabaseUrl, supabaseKey);
