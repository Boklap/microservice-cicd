#!/bin/sh

redis-server --daemonize yes
redis-cli set payment:1 '{"order_id":1,"amount":100,"status":"completed"}'
redis-cli set payment:2 '{"order_id":2,"amount":200,"status":"pending"}'
redis-cli shutdown
redis-server /usr/local/etc/redis/redis.conf