#!/bin/bash
set -e

echo "Setting up local development environment..."

echo "Starting Docker containers..."
docker compose up -d

# Wait for PostgreSQL to be ready
echo "Waiting for PostgreSQL to be ready..."
sleep 5

# Run TypeORM migrations
# echo "Running database migrations..."
# npm run typeorm migration:run

echo "Local development environment is ready!"

