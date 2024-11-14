FROM node:22.11.0 AS build

WORKDIR /app

COPY package*.json ./

RUN npm install -g npm@10.7.0

RUN npm install --legacy-peer-deps

COPY . .

EXPOSE 80

CMD [ "npm", "start" ]

