FROM node:12.7-alpine

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

ARG REDIS_URL

ARG SOCKET_PORT=3000

EXPOSE ${SOCKET_PORT}

CMD node index.js
