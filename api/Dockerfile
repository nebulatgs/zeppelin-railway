FROM debian:latest

RUN apt update
RUN apt install curl build-essential git python3 python3-pip -y

SHELL ["/bin/bash", "--login", "-c"]

RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash

WORKDIR /app
ARG GIT_REPO=https://github.com/Dragory/ZeppelinBot.git
RUN git clone $GIT_REPO

WORKDIR /app/ZeppelinBot
RUN nvm install
RUN touch .env
COPY railway.patch .
RUN git apply railway.patch

WORKDIR /app/ZeppelinBot/backend
RUN npm ci
RUN touch bot.env api.env

RUN npm run build

ARG DB_DATABASE
ARG DB_PASSWORD
ARG DB_PORT
ARG DB_USER
ARG DB_HOST
ARG KEY

RUN npm run migrate-prod

ARG STAFF
ARG DASHBOARD_URL
ARG CLIENT_SECRET
ARG OAUTH_CALLBACK_URL
ARG CLIENT_ID
ARG PORT

ENTRYPOINT ["/bin/bash", "--login", "-c", "npm run start-api-prod"]