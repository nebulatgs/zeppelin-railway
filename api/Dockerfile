FROM debian:latest
RUN apt update
RUN apt install curl build-essential git python3 python3-pip -y
SHELL ["/bin/bash", "--login", "-c"]
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
WORKDIR /app
RUN git clone https://github.com/Dragory/ZeppelinBot.git
WORKDIR /app/ZeppelinBot
RUN nvm install
RUN touch .env
WORKDIR /app/ZeppelinBot/backend
RUN npm ci
RUN npm uninstall mysql && npm i mysql2
RUN touch bot.env api.env
RUN sed -i '/database: process.env.DB_DATABASE,/a port: process.env.DB_PORT,' ormconfig.js
RUN npm run migrate-prod
RUN npm run build
ENTRYPOINT ["/bin/bash", "--login", "-c", "npm run start-api-prod"]