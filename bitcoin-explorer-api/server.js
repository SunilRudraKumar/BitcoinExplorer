const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors());

const pool = new Pool({
  user: 'user',
  host: 'localhost',
  database: 'bitcoin_explorer',
  password: 'password',
  port: 5432,
});

app.get('/onchain', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM on_chain_data ORDER BY timestamp DESC LIMIT 1');
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/offchain', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM off_chain_data ORDER BY timestamp DESC LIMIT 1');
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
