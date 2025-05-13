
# Stage 1: Build
FROM node:20-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm install

# Tambahkan ARG sebelum build
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

COPY . .

# Build untuk production
RUN npm run build

# Stage 2: Serve build via NGINX
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
