FROM node:latest

WORKDIR /back/front
COPY ./front ./
RUN npm install
RUN npm run build

WORKDIR /back
COPY ./back/package*.json ./
RUN npm install
COPY ./back/index.js ./

EXPOSE 5000

CMD ["node", "index.js"]
