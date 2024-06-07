use reqwest::Client;
use serde::Deserialize;
use std::error::Error;
use tokio_postgres::Client as PgClient;

#[derive(Debug, Deserialize)]
pub struct OffchainData {
    pub price: f64,
}

pub async fn fetch_offchain_data(
    api_key: &str,
    pg_client: &PgClient,
) -> Result<OffchainData, Box<dyn Error>> {
    let client = Client::new();

    let url = format!(
        "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&api_key={}",
        api_key
    );

    let response: serde_json::Value = client.get(&url).send().await?.json().await?;
    let price = response["bitcoin"]["usd"]
        .as_f64()
        .ok_or("Failed to parse price")?;

    pg_client
        .execute("INSERT INTO off_chain_data (price) VALUES ($1)", &[&price])
        .await?;

    Ok(OffchainData { price })
}
