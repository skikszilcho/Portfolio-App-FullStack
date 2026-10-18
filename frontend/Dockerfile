# ── Stage 1: build ───────────────────────────────────────────────────────────
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build
# Output: /app/dist/

# ── Stage 2: serve ───────────────────────────────────────────────────────────
FROM nginx:alpine AS serve

# Copy the Vite production build into nginx's html directory
COPY --from=build /app/dist /usr/share/nginx/html

# Replace the default nginx config with our SPA-aware config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
