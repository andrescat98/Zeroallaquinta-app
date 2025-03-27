"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    // 1️⃣ REGISTRAZIONE CON SUPABASE AUTH
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    // 2️⃣ INSERISCI UTENTE NELLA TABELLA "users"
    const userId = authData.user?.id;
    if (userId) {
      const { error: dbError } = await supabase.from("users").insert([
        {
          id: userId, // Stesso ID di Supabase Auth
          name,
          email,
          role: "member",
        },
      ]);

      if (dbError) {
        setError(dbError.message);
        setLoading(false);
        return;
      }
    }

    setLoading(false);
    alert("Registrazione riuscita! Controlla la tua email per verificare l'account.");
    router.push("/login");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-2xl font-bold mb-4">Registrati</h2>
      <form onSubmit={handleSignup} className="w-80 space-y-4">
        <input
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 w-full rounded"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 w-full rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 w-full rounded"
          required
        />
        {error && <p className="text-red-500">{error}</p>}
        <button
          type="submit"
          className="bg-green-500 text-white p-2 rounded w-full"
          disabled={loading}
        >
          {loading ? "Registrando..." : "Registrati"}
        </button>
      </form>
    </div>
  );
}
