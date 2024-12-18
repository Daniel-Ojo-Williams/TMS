FROM node:lts-alpine as build

WORKDIR /app

COPY package.json .
COPY pnpm-lock.yaml .

RUN npm install -g pnpm
RUN pnpm install

COPY . .

RUN pnpm build

FROM node:lts-alpine

WORKDIR /app

RUN npm install -g pnpm

COPY --from=build /app/package.json .
COPY --from=build /app/pnpm-lock.yaml .
COPY --from=build /app/dist ./dist

RUN pnpm i -p

EXPOSE 3000

CMD [ "pnpm", "start" ]