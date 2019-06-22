FROM node AS build-env

RUN apt-get update && \
    npm i npm@latest -g

COPY package-lock.json /package-lock.json
COPY package.json /package.json
COPY redis-client.js /redis-client.js
COPY router.js /router.js
COPY server.js /server.js

RUN npm install
