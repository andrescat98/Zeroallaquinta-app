import { Client } from 'pg';

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

client.connect()
  .then(() => console.log('Connesso al database PostgreSQL'))
  .catch(err => console.error('Errore di connessione al database:', err));

export default client;
