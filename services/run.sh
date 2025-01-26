cd user-service
docker compose up -d --build
cd ..

cd product-service
docker compose up -d --build
cd ..

cd order-service
docker compose up -d --build
cd ..