FROM node:fermium-alpine3.11

ENV NODE_ENV development

WORKDIR /app
COPY package.json .
RUN npm install 
COPY . .

CMD ["npm", "run", "dev"]