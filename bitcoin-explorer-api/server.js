const express = require('express');
const cors = require('cors');
const { Client } = require('pg'); // Assuming you're using pg module for PostgreSQL

const app = express();
const port = 3001;

app.use(cors());

let onchainData = null;
let offchainData = null;

const client = new Client({
  user: 'user',
  host: 'localhost',
  database: 'bitcoin_explorer',
  password: 'password',
  port: 5432,
});

client.connect();

// Function to fetch on-chain data from the database
const fetchOnchainData = async () => {
  try {
    const res = await client.query('SELECT * FROM on_chain_data ORDER BY id DESC LIMIT 1');
    if (res.rows.length > 0) {
      onchainData = res.rows[0];
    }
  } catch (err) {
    console.error('Error fetching on-chain data:', err);
  }
};

// Function to fetch off-chain data from the database
const fetchOffchainData = async () => {
  try {
    const res = await client.query('SELECT * FROM off_chain_data ORDER BY id DESC LIMIT 1');
    if (res.rows.length > 0) {
      offchainData = res.rows[0];
    }
  } catch (err) {
    console.error('Error fetching off-chain data:', err);
  }
};

// Periodically update the data
setInterval(() => {
  fetchOnchainData();
  fetchOffchainData();
}, 1000); // Fetch data every 60 seconds

// Endpoint to get the latest on-chain data
app.get('/onchain', (req, res) => {
  res.json(onchainData);
});

// Endpoint to get the latest off-chain data
app.get('/offchain', (req, res) => {
  res.json(offchainData);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
