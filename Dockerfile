FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install -g ngrok

RUN ngrok config add-authtoken 2YoIO19wYfWM7zTCzOVG9w0vQKu_6GAfrpA2zq8LDHyjEBEw8

RUN npm install --force

COPY . .

RUN npm run build

EXPOSE 3000

# CMD ["npm", "start"]
CMD ["npm", "run", "start:all"]