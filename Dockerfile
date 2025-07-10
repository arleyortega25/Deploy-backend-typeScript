
FROM node:22.15.0

RUN npm install -g ts-node

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

ENV NODE_ENV=production


EXPOSE 7000

CMD ["npm", "start"]