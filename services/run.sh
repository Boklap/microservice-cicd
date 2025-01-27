#!/bin/bash

services=("user-service" "product-service" "order-service" "payment-service" "notification-service")

for service in "${services[@]}"; do
  echo "Building and starting $service..."
  cd $service
  docker compose up -d --build
  cd ..
done
