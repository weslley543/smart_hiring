FROM node:18 AS builder


WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run compile

FROM node:18-slim

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/package*.json ./
COPY --from=builder /usr/src/app/dist ./dist
RUN npm install --production

EXPOSE 3000

CMD ["node", "dist/index.js"]
