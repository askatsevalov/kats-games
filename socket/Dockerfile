FROM node:12.7-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --loglevel=error

COPY . .

ARG REDIS_URL

ARG SOCKET_PORT=3000

EXPOSE ${SOCKET_PORT}

CMD node index.js
