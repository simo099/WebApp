FROM node:16

WORKDIR /usr/src/app

COPY . .

RUN npm install

EXPOSE 3000
CMD [ "node", "src/index.js" ]
