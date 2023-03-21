FROM node:18.15


COPY package.json .
RUN npm install
COPY . .

EXPOSE 8080
CMD npm run start
