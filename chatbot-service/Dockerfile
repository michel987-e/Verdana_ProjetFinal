FROM node:lts
WORKDIR /app
COPY package*.json ./
RUN apt update && npm cache clean --force && npm install
COPY . .
CMD ["npm", "start"]
