FROM nginx:latest

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

WORKDIR /app/ZeppelinBot/dashboard
RUN npm ci

ARG API_URL

RUN echo "API_URL=$API_URL" > .env
RUN npm run build

WORKDIR /etc/nginx/sites-available
COPY . .
RUN rm /etc/nginx/conf.d/default.conf
RUN ln -s /etc/nginx/sites-available/zeppelin /etc/nginx/conf.d/default.conf