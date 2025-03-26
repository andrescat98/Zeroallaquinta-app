import Link from "next/link"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold">Associazione Culturale</h1>
          <p className="text-gray-600">Accedi al tuo account per gestire eventi e visualizzare il calendario</p>
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
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
            <input id="password" type="password" className="w-full px-3 py-2 border rounded-md" />
          </div>
        </div>
        <div className="mt-6 space-y-2">
          <Link
            href="/dashboard"
            className="block w-full bg-blue-600 text-white text-center py-2 px-4 rounded-md hover:bg-blue-700"
          >
            Accedi
          </Link>
          <div className="text-center text-sm">
            Non hai un account?{" "}
            <Link href="/register" className="text-blue-600 hover:underline">
              Contatta l&apos;amministratore
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

