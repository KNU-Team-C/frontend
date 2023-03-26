FROM node:16.19.1-alpine

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./
COPY package-lock.json ./
RUN npm install

COPY . ./

RUN npm run build --production
RUN npm install -g serve

EXPOSE 8080

CMD ["serve", "-l", "8080", "-s", "build"]
