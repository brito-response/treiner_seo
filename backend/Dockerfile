FROM node:20-alpine

RUN corepack enable
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
EXPOSE 8000

CMD ["pnpm", "run", "start:dev"]