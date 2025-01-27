FROM redis:8.0-M03-alpine3.21

WORKDIR /usr/local/bin/

COPY ./redis.conf /usr/local/etc/redis/redis.conf

COPY ./init_db.sh ./

RUN chmod +x ./init_db.sh

CMD ["echo \"hehe\"", "./init_db.sh"]