FROM apify/actor-node:16

COPY actor_2/ ./actor_2/
COPY shared/ ./shared/

WORKDIR /usr/src/app/actor_2

RUN npm install

CMD npm start
