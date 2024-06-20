import { NextApiRequest, NextApiResponse } from 'next';
import { Client } from 'pg';

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

client.connect().then(() => {
  console.log('Connected to PostgreSQL database');
}).catch((err) => {
  console.error('Failed to connect to PostgreSQL database:', err);
});

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const result = await client.query('SELECT * FROM offchain_data ORDER BY id DESC LIMIT 1');
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error('Error executing query:', err);
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: 'Unknown error' });
    }
  }
};

export default handler;
