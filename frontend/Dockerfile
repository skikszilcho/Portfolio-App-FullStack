# ── Stage 1: build ─────────────────────────────────────────────────────────────
FROM node:20-alpine AS build

WORKDIR /app

# Install dependencies first (layer-cached unless package.json changes)
COPY package*.json ./
RUN npm ci

# Copy source and build
COPY . .
# CHANGE: pass your production API URL as a build arg if needed
ARG VITE_API_URL=""
ENV VITE_API_URL=$VITE_API_URL
RUN npm run build

# ── Stage 2: serve ─────────────────────────────────────────────────────────────
# Serves the static build output via nginx on port 80.
FROM nginx:1.27-alpine AS production

# Copy built assets from stage 1
COPY --from=build /app/dist /usr/share/nginx/html

# CHANGE: replace with your own nginx.conf if you need custom routing (e.g. SPA fallback)
# The default config below rewrites all 404s to index.html for client-side routing.
RUN printf 'server {\n\
  listen 80;\n\
  root /usr/share/nginx/html;\n\
  index index.html;\n\
  location / {\n\
    try_files $uri $uri/ /index.html;\n\
  }\n\
}\n' > /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
