FROM node:16

RUN mkdir -p /ascope-bot
COPY index.js package.json yarn.lock /ascope-bot/
COPY images /ascope-bot/images/
RUN cd /ascope-bot && yarn

EXPOSE 80

CMD node /ascope-bot
