mod offchain;
mod onchain;

use std::error::Error;
use std::time::Duration;
use tokio;
use tokio::time::sleep;
use tokio_postgres::NoTls;

#[tokio::main]
async fn main() -> Result<(), Box<dyn Error>> {
    let (pg_client, connection) = tokio_postgres::connect(
        "host=localhost user=user password=password dbname=bitcoin_explorer",
        NoTls,
    )
    .await?;

    tokio::spawn(async move {
        if let Err(e) = connection.await {
            eprintln!("connection error: {}", e);
        }
    });

    let api_key = "CG-uMKNZfAAEuTLp2dtXqscGeSx"; // Replace with your actual API key

    loop {
        // Fetch and store on-chain data
        match onchain::fetch_onchain_data(&pg_client).await {
            Ok(onchain_data) => println!("On-Chain Data: {:?}", onchain_data),
            Err(e) => eprintln!("Failed to fetch on-chain data: {}", e),
        }

        // Fetch and store off-chain data
        match offchain::fetch_offchain_data(api_key, &pg_client).await {
            Ok(offchain_data) => println!("Off-Chain Data: {:?}", offchain_data),
            Err(e) => eprintln!("Failed to fetch off-chain data: {}", e),
        }

        // Wait for 60 seconds before the next iteration
        sleep(Duration::from_secs(5)).await;
    }
}
