FROM node:alpine3.20

WORKDIR /app

COPY package*.json .

RUN npm ci

COPY . .

RUN rm Dockerfile .env
RUN addgroup -S app && adduser -S app -G app

USER app

EXPOSE 3004

CMD ["node", "src/index.js"]