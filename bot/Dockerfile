FROM debian:latest

ARG CLIENT_SECRET
ARG SERVER_NAME
ARG STAFF
ARG OAUTH_CALLBACK_URL
ARG CLIENT_ID
ARG PORT
ARG DB_PASSWORD
ARG DASHBOARD_URL
ARG DB_PORT
ARG DB_USER
ARG DB_HOST
ARG ACCOUNT_ID
ARG SERVER_ID
ARG OWNER_ID
ARG TOKEN
ARG KEY
ARG PROFILING
ARG DB_DATABASE
ARG thing

RUN apt update
RUN apt install curl build-essential git python3 python3-pip -y
SHELL ["/bin/bash", "--login", "-c"]
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
WORKDIR /app
RUN git clone https://github.com/Dragory/ZeppelinBot.git
WORKDIR /app/ZeppelinBot
RUN nvm install
RUN touch .env
COPY railway.patch .
RUN git apply railway.patch
WORKDIR /app/ZeppelinBot/backend
RUN npm ci
# RUN npm uninstall mysql && npm i mysql2
RUN touch bot.env api.env
# RUN sed -i '/database: process.env.DB_DATABASE,/a port: process.env.DB_PORT,' ormconfig.js
RUN npm run build
ENTRYPOINT ["/bin/bash", "--login", "-c", "npm run start-bot-prod"]