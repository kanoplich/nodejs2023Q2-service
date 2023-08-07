FROM node:18-alpine
WORKDIR /app
COPY package*.json .
RUN npm ci && npm cache clean --force
COPY . .
ARG PORT
ENV PORT=${PORT}
EXPOSE ${PORT}
CMD [ "npm", "run", "start:dev"]