# Multi-stage Dockerfile

# Stage 1: Building the React application
FROM node AS build

WORKDIR /app

COPY package* ./

RUN npm install

COPY public ./public

COPY src ./src

RUN npm run build


# Hosting the React application on Nginx server
FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html


