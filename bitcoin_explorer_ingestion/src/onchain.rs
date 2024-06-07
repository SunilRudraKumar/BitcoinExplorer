extern crate bitcoincore_rpc;

use bitcoincore_rpc::{bitcoin::BlockHash, Auth, Client, RpcApi};
use std::error::Error;
use std::str::FromStr;
use tokio_postgres::Client as PgClient;

#[derive(Debug)]
pub struct OnchainData {
    pub block_count: u64,
    pub best_block_hash: String,
    pub num_transactions: usize,
    pub total_volume: f64,
    pub mempool_size: usize,
    pub avg_fee: f64,
}

pub async fn fetch_onchain_data(pg_client: &PgClient) -> Result<OnchainData, Box<dyn Error>> {
    let rpc = Client::new(
        "http://localhost:8332",
        Auth::UserPass("myuser".to_string(), "mypassword".to_string()),
    )?;

    let block_count = rpc.get_block_count()?;
    let best_block_hash_str = rpc.get_best_block_hash()?.to_string();
    let best_block_hash = BlockHash::from_str(&best_block_hash_str)?;
    let block = rpc.get_block(&best_block_hash)?;
    let num_transactions = block.txdata.len();

    let total_volume: f64 = block
        .txdata
        .iter()
        .map(|tx| tx.output.iter().map(|out| out.value.to_sat()).sum::<u64>())
        .sum::<u64>() as f64
        / 100_000_000.0;

    let mempool_info = rpc.get_mempool_info()?;
    let mempool_size = mempool_info.size as i64; // Cast to i64
    let avg_fee: f64 = mempool_info.mempool_min_fee.to_sat() as f64 / 100_000_000.0;

    pg_client.execute(
        "INSERT INTO on_chain_data (block_count, best_block_hash, num_transactions, total_volume, mempool_size, avg_fee) VALUES ($1, $2, $3, $4, $5, $6)",
        &[&(block_count as i64), &best_block_hash_str, &(num_transactions as i64), &total_volume, &mempool_size, &avg_fee]
    ).await?;

    Ok(OnchainData {
        block_count,
        best_block_hash: best_block_hash_str,
        num_transactions,
        total_volume,
        mempool_size: mempool_info.size, // Keep as usize for OnchainData struct
        avg_fee,
    })
}