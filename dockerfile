FROM node:18-alpine
WORKDIR /app
COPY ./package.json ./
RUN npm install bcrypt@5.0.0
RUN npm i
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]