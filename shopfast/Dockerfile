# Multi-stage Dockerfile for ShopFast AWS Deployment
FROM node:20-alpine AS builder

WORKDIR /app

# Install build dependencies for native modules if needed
RUN apk add --no-cache python3 make g++

COPY package*.json tsconfig*.json nest-cli.json ./
RUN npm ci --legacy-peer-deps

# Build Frontend (React + Vite)
COPY frontend ./frontend
RUN cd frontend && npm ci --legacy-peer-deps && npm run build && rm -rf node_modules

COPY src ./src

RUN npm run build

# Runner stage
FROM node:20-alpine AS runner

WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000

# Install runtime dependencies
RUN apk add --no-cache wget

COPY package*.json ./
RUN npm ci --omit=dev --legacy-peer-deps && npm cache clean --force

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/public ./public

# Health check for AWS ALB / Docker
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD wget -qO- http://localhost:3000/api/health || exit 1

EXPOSE 3000
EXPOSE 80

USER node

CMD ["node", "dist/main.js"]
