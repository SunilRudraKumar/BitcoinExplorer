import { NextApiRequest, NextApiResponse } from 'next';
import { Client } from 'pg';

const client = new Client({
  user: 'user',
  host: 'localhost',
  database: 'bitcoin_explorer',
  password: 'password',
  port: 5432,
});

client.connect();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const result = await client.query('SELECT * FROM off_chain_data ORDER BY id DESC LIMIT 1');
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
