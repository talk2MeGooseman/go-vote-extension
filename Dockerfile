FROM node:8.9-alpine

ENV NODE_ENV production

WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]

RUN npm install --development --silent && mv node_modules ../

COPY . .

EXPOSE 3003
CMD npm run build