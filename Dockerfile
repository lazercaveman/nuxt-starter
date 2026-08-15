# Optional: builds a self-contained image. The NAS deployment in docker-compose.yml does not use
# this file — it mounts a `.output/` that was built on a dev machine. Both start the server the
# same way, so the two paths stay interchangeable.

# 1. Build stage
FROM node:24-alpine AS builder
WORKDIR /app

# Yarn 4 comes from the repo via `packageManager`, so Corepack has to hand over to it.
RUN corepack enable
COPY package.json yarn.lock .yarnrc.yml ./
COPY .yarn/ ./.yarn/
RUN yarn install --immutable

COPY . .
RUN yarn build

# 2. Runtime stage — only the Nitro bundle, which already carries its own dependencies.
FROM node:24-alpine
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOST=0.0.0.0
ENV AUCTION_DATA_FILE=/data/auctions.json

COPY --from=builder /app/.output ./.output

# The crawl history lives outside the bundle so a new image does not reset it.
VOLUME /data

EXPOSE 3000
CMD ["node", ".output/server/index.mjs"]
