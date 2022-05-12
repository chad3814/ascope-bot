FROM node:16

RUN apt update && apt install -y cron

RUN mkdir -p /ascope-bot
COPY docker_entrypoint.sh crontab index.js package.json yarn.lock slack_token.txt /ascope-bot/
COPY images /ascope-bot/images/
RUN cd /ascope-bot && yarn

RUN crontab /ascope-bot/crontab

EXPOSE 80

ENTRYPOINT [ "/ascope-bot/docker_entrypoint.sh" ]

CMD [ "node", "/ascope-bot" ]
