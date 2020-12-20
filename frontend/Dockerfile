FROM node:12.7-alpine AS build-env

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build --prod

FROM nginx:stable-alpine

COPY --from=build-env /app/dist/kats-games /usr/share/nginx/html

ARG FRONT_PORT=8000

EXPOSE ${FRONT_PORT}
