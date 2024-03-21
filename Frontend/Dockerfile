FROM node:latest as build-stage
WORKDIR /build
COPY . .
RUN npm install &&\
    npm run build

FROM nginx:stable-alpine as production-stage
RUN mkdir /app
COPY --from=build-stage /build/dist /app
COPY ./nginx.conf /etc/nginx/nginx.conf
