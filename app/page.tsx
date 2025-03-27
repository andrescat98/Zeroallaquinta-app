"use client"
import Link from 'next/link'
import { useState, useEffect } from "react"
import { supabase } from "@/lib/server"  // Assicurati che il path sia corretto
import { useRouter } from 'next/navigation' // Usa il nuovo hook per l'App Router

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null) // Per visualizzare errori
  const [loading, setLoading] = useState(false) // Per lo stato di caricamento
  const router = useRouter() // Inizializza useRouter per il redirect

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !password) {
      setError("Tutti i campi sono obbligatori")
      return
    }

    setLoading(true)
    setError(null) // Resetta l'errore se c'è

    // Fai la richiesta di login a Supabase
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    setLoading(false)

    if (error) {
      setError("Errore di login: " + error.message)
    } else {
      console.log("Login riuscito:", data)
      
      // Dopo il login riuscito, verifica la sessione
      const { data: session, error: sessionError } = await supabase.auth.getSession()
      if (session) {
        // Redirige alla dashboard dopo il login riuscito
        router.push('/dashboard')
      } else {
        setError("Impossibile ottenere la sessione.")
      }
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold">Associazione Culturale</h1>
          <p className="text-gray-600">Accedi al tuo account per gestire eventi e visualizzare il calendario</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="nome@esempio.it"
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium">
                Password
              </label>
              <Link href="/reset-password" className="text-sm text-blue-600 hover:underline">
                Password dimenticata?
              </Link>
            </div>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          {error && <div className="text-red-600 text-sm">{error}</div>} {/* Mostra l'errore se presente */}
          <div className="mt-6 space-y-2">
            <button
              type="submit"
              className="block w-full bg-blue-600 text-white text-center py-2 px-4 rounded-md hover:bg-blue-700"
              disabled={loading} // Disabilita il bottone durante il caricamento
            >
              {loading ? "Caricamento..." : "Accedi"} {/* Mostra "Caricamento..." durante il login */}
            </button>
            <div className="text-center text-sm">
              Non hai un account?{" "}
              <Link href="/register" className="text-blue-600 hover:underline">
                Contatta l&apos;amministratore
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
