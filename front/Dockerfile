FROM node:lts
WORKDIR /app
COPY package*.json ./
RUN npm install && npm install --global @expo/ngrok@^4.1.0
COPY . .
EXPOSE 19000 19001 19002
ENV EXPO_DEVTOOLS_LISTEN_ADDRESS=0.0.0.0
CMD ["npx", "expo", "start", "--tunnel"]
