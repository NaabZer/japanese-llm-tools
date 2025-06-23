# --- Stage 1: Builder ---
#FROM node:lts-alpine AS builder
FROM node:lts-alpine3.19 AS builder

WORKDIR /app

RUN apk add --no-cache build-base python3 git

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM node:lts-alpine

WORKDIR /app

RUN npm install -g serve

COPY --from=builder /app/dist /app/dist

EXPOSE 3000

CMD ["serve", "-s", "dist", "-l", "3000"]
