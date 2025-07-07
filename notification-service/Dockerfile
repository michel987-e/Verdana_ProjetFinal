FROM node:20

WORKDIR /app

COPY package*.json ./
RUN npm install --legacy-peer-deps --include=dev

COPY . .

RUN npm run build

CMD ["node", "dist/main.js"]
