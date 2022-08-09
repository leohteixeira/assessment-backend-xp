FROM node:14-alpine

USER node
RUN mkdir /home/node/api
RUN chown -R node:node /home/node/api
WORKDIR /home/node/api

COPY --chown=node:node package*.json ./
RUN npm install --only=prod
ADD --chown=node:node ./dist dist/

ENV PORT=3030

EXPOSE 3030
CMD node dist/main/server.js