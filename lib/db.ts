import { Client } from 'pg';

const client = new Client({
  connectionString: process.env.DATABASE_URL, // Assicurati che la variabile d'ambiente sia configurata correttamente
});

async function testConnection() {
  try {
    await client.connect(); // Connessione al database
    console.log('Database connected successfully!');

    // Esegui una query di test
    const res = await client.query('SELECT NOW()'); // Query di esempio per ottenere il timestamp corrente
    console.log('Query result:', res.rows[0]);

    await client.end(); // Chiudi la connessione
  } catch (err) {
    console.error('Error connecting to the database:', err);
  }
}

testConnection();
