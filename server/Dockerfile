FROM node:lts-alpine

WORKDIR /app

RUN npm config set fund false && npm install

COPY . ./

CMD ["npm", "start"]