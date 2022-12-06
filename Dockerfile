FROM node:16

WORKDIR /app

COPY package.json .

RUN npm i 

COPY . . /app/

RUN npm run build

EXPOSE 3005

CMD ["npm", "start"]