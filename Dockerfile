FROM node:16-alpine
LABEL name "somebot"

WORKDIR /usr/somebot

RUN apk add --update \
&& apk add --no-cache ca-certificates \
&& apk add --no-cache --virtual .build-deps curl git python3 alpine-sdk libc6-compat

COPY turbo.json package.json tsconfig.json yarn.lock .yarnrc.yml ./
COPY .yarn ./.yarn

COPY packages/api/package.json ./packages/api/package.json
COPY packages/bot/package.json ./packages/bot/package.json

RUN yarn --immutable

COPY prisma ./prisma
RUN yarn prisma generate

COPY packages/api ./packages/api
COPY packages/bot ./packages/bot

RUN yarn build

RUN yarn workspaces focus --all --production
