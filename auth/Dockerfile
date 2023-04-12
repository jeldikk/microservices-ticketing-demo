FROM node:alpine

WORKDIR /app
RUN pwd
RUN ls
COPY package.json ./
RUN npm install --only=prod
COPY ./ ./

CMD [ "npm", "run", "dev" ]