FROM node AS build-env

RUN apt-get update && \
    npm i npm@latest -g

COPY package-lock.json /package-lock.json
COPY package.json /package.json
COPY config.js /config.js
COPY file-route.js /file-route.js
COPY redis-client.js /redis-client.js
COPY redis-populate.js /redis-populate.js
COPY server.js /server.js
COPY storage.js /storage.js

RUN npm install
