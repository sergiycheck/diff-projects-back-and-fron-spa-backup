FROM node:latest AS base
RUN npm i -g pnpm

FROM base as dependencies
WORKDIR /home/node/app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install

FROM base as build
WORKDIR /home/node/app
COPY . .
COPY --from=dependencies /home/node/app/node_modules ./node_modules
RUN pnpm run build

FROM base as deploy
WORKDIR /home/node/app
COPY --from=build /home/node/app/dist ./dist
COPY --from=build /home/node/app/node_modules ./node_modules
EXPOSE 80
CMD ["node", "dist/main"]
