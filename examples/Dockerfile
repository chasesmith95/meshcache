FROM node:alpine

COPY ./ /app/

WORKDIR /app/

RUN apk update && apk add bash python g++ make && rm -rf /var/cache/apk/*

COPY ./package.json /app/

RUN npm install

COPY . /app/

RUN npm rebuild

EXPOSE 3000

CMD ["npm", "start"]
