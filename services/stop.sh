#!/bin/bash

services=("user-service" "product-service" "order-service" "payment-service")

for service in "${services[@]}"; do
  cd $service
  docker compose down -v
  cd ..
done
