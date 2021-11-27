FROM node:latest as builder
COPY . .
RUN npm ci
RUN npm run build

FROM caddy:2.4.5-alpine

COPY Caddyfile /etc/caddy/Caddyfile
COPY --from=builder ./dist /statics