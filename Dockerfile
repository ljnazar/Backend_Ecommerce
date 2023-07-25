FROM node

WORKDIR /app

COPY package*.json ./

COPY . .

EXPOSE 8080

CMD ["npm","start"]