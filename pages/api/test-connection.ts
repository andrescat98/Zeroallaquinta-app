// pages/api/test-connection.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { Client } from 'pg';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const client = new Client({
    connectionString: process.env.DATABASE_URL, // Assicurati che DATABASE_URL sia definito
  });

  try {
    // Tenta di connetterti al database
    await client.connect();
    console.log('Database connection successful');
    res.status(200).json({ message: 'Connection successful' });
  } catch (error: unknown) {
    // Verifica se l'errore è un'istanza di Error
    if (error instanceof Error) {
      console.error('Database connection failed', error);
      res.status(500).json({ message: 'Connection failed', error: error.message });
    } else {
      // Gestisci il caso in cui l'errore non sia di tipo Error
      console.error('Unknown error occurred', error);
      res.status(500).json({ message: 'Connection failed', error: 'Unknown error' });
    }
  } finally {
    await client.end();
  }
}
