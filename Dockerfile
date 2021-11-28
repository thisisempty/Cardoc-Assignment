# Step 1
## base image for Step 1: Node 10
FROM node:10 AS builder
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build


# Step 2
## base image for Step 2: Node 10-alpine(light weight)
FROM node:10-alpine
WORKDIR /app
COPY --from=builder /app ./
CMD ["npm", "run", "start:prod"]