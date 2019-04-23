
FROM node:alpine

COPY ./ /app/

WORKDIR /app/

COPY ./package.json /app/

RUN npm install

COPY . /app/

RUN npm rebuild

EXPOSE 3000

CMD ["npm", "start"]
