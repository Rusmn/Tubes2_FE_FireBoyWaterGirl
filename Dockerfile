# Stage 1: Build
FROM node:20-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm install

# Salin semua file termasuk .env
COPY . .

# Build untuk production
RUN npm run build

# Stage 2: Serve build hasil via NGINX
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html

# (Opsional) konfigurasi nginx
# COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
