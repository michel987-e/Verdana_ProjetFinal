FROM node:20-slim

WORKDIR /app

COPY package*.json ./

RUN apt update && npm cache clean --force && npm install

COPY . .

CMD ["npm", "start"]
