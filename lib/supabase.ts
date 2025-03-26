import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Le variabili d\'ambiente di Supabase non sono definite.')
}

export const supabase = createClient(supabaseUrl, supabaseKey)
