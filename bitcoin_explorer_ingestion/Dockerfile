# Dockerfile for Rust ingestion script
FROM rust:1.63 as builder
WORKDIR /usr/src/app
COPY . .
RUN apt-get update && apt-get install -y libssl-dev
RUN cargo install --path .

FROM debian:bullseye-slim
RUN apt-get update && apt-get install -y libssl1.1 ca-certificates
COPY --from=builder /usr/local/cargo/bin/bitcoin_explorer_ingestion /usr/local/bin/bitcoin_explorer_ingestion
CMD ["bitcoin_explorer_ingestion"]
