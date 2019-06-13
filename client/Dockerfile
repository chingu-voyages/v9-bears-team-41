FROM node AS build-env

RUN apt-get update && \
    npm i npm@latest -g

COPY .babelrc /.babelrc
COPY webpack /webpack
COPY package-lock.json /package-lock.json
COPY package.json /package.json
COPY src /src

RUN npm install

RUN npm run build-prod && \
    mkdir /www && \
    chmod -R 755 /www &&\
    cp -rpv /build/* /www

FROM nginx

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf

RUN mkdir /www && \
    chmod -R 755 /www

COPY --from=0 /www /www
