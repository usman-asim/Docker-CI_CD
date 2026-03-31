FROM node:24-slim AS build

WORKDIR /usr/src/app

COPY package*.json .

RUN npm ci

COPY . .

RUN npm run build


FROM node:24-slim AS runtime

WORKDIR /usr/src/app

ENV NODE_ENV=production

COPY package*.json .

RUN npm ci --omit=dev

COPY --from=build /usr/src/app/dist ./dist

EXPOSE 5000

CMD ["npm", "run", "start"]