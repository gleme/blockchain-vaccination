FROM node:erbium-alpine
WORKDIR /usr/app

COPY package*.json ./ 

RUN npm ci

COPY . .

EXPOSE 8000

CMD [ "npm", "run", "start:dev"]
