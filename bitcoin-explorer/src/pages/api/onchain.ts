import { NextApiRequest, NextApiResponse } from 'next';
import { Client } from 'pg';

const client = new Client({
  user: 'user',
  host: 'localhost',
  database: 'bitcoin_explorer',
  password: 'password',
  port: 5432,
});

client.connect().then(() => {
  console.log('Connected to PostgreSQL database');
}).catch((err) => {
  console.error('Failed to connect to PostgreSQL database:', err);
});

export default async (req: NextApiRequest, res: NextApiResponse) => {
  console.log('Received request to /api/onchain');
  try {
    const query = `
      SELECT block_count, best_block_hash, num_transactions, total_volume, mempool_size, avg_fee, timestamp
      FROM on_chain_data
      ORDER BY block_count DESC
      LIMIT 5;
    `;
    const result = await client.query(query);
    console.log('Query successful:');
    res.status(200).json(result.rows);
  } catch (err) {
    console.error('Error executing query:', err);
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: 'Unknown error' });
    }
  }
};
