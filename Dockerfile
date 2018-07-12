FROM node:9.11-alpine AS base

ENV SERVER_PATH=/usr/src/server

ENV PORT=8080 \
  HOST=0.0.0.0

EXPOSE $PORT

WORKDIR ${SERVER_PATH}

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

CMD [ "yarn", "dev" ];