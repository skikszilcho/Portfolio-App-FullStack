# ── Stage 1: build ───────────────────────────────────────────────────────────
# Official node:22 matches better-sqlite3@13 engine requirements (Node >= 22)
FROM node:22 AS build

WORKDIR /app

COPY package*.json ./
RUN npm install --omit=dev

# ── Stage 2: runtime ──────────────────────────────────────────────────────────
# Minimal Debian slim runtime with glibc compatibility
FROM node:22-slim AS runtime

WORKDIR /app

# Copy production node_modules from build stage
COPY --from=build /app/node_modules ./node_modules
COPY package*.json ./
COPY src/ ./src/

# Create the data directory for SQLite quota database and assign ownership
RUN mkdir -p /app/data && chown -R node:node /app

# Run as the built-in non-root node user
USER node

EXPOSE 5000

CMD ["node", "src/server.js"]