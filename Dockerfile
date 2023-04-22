FROM node:18-alpine
WORKDIR /app
COPY package*.json .
RUN npm install
RUN npm install -g serve
COPY . .
RUN npm run build
WORKDIR /app/build
CMD ["npx", "serve"]
EXPOSE 3000