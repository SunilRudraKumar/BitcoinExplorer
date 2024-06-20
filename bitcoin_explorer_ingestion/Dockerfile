# Stage 1: Build the Rust application
FROM rust:1.56 as builder
WORKDIR /usr/src/app
COPY . .
RUN cargo install --path .

# Stage 2: Run the Rust application
FROM debian:buster-slim
COPY --from=builder /usr/local/cargo/bin/bitcoin_explorer_ingestion /usr/local/bin/bitcoin_explorer_ingestion
CMD ["bitcoin_explorer_ingestion"]
