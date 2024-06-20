# Use a more recent version of Rust
FROM rust:1.63 as builder

WORKDIR /usr/src/app

# Copy the entire application into the Docker image
COPY . .

# Install the Rust application
RUN cargo install --path .

# Use a slim Debian base image for the final stage
FROM debian:buster-slim

# Copy the compiled binary from the builder stage
COPY --from=builder /usr/local/cargo/bin/bitcoin_explorer_ingestion /usr/local/bin/bitcoin_explorer_ingestion

# Set the command to run the application
CMD ["bitcoin_explorer_ingestion"]
