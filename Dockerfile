FROM node:18-alpine AS build
COPY package.json pnpm-lock.yaml ./
RUN npm i -g pnpm
RUN pnpm install
COPY . .
RUN pnpm build
EXPOSE 3000
CMD ["pnpm","start"]