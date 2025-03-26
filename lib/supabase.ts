// lib/supabase.js
import { createClient } from '@supabase/supabase-js'

// Ottieni le variabili di ambiente
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Verifica che le variabili di ambiente siano definite
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Le variabili di ambiente Supabase non sono configurate correttamente.')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
