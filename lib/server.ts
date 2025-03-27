import { createClient as createSupabaseClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'

export const createClient = (cookieStore: ReturnType<typeof cookies>) => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Le variabili d\'ambiente di Supabase non sono definite.')
  }

  // Crea l'istanza del client Supabase
  const supabase = createSupabaseClient(supabaseUrl, supabaseKey)

  // Gestione dei cookies
  supabase.auth.setAuth = (token: string) => {
    try {
      cookieStore.set('sb-access-token', token, { path: '/' })
    } catch (error) {
      console.error('Errore durante la gestione dei cookie:', error)
    }
  }

  supabase.auth.getAuth = () => {
    return cookieStore.get('sb-access-token') || ''
  }

  return supabase
}
