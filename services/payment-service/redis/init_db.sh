#!/bin/sh

redis-server /usr/local/etc/redis/redis.conf

sleep 5

echo "hehe"

redis-cli

set payment:1 '{"order_id":1,"amount":100,"status":"completed"}'
set payment:2 '{"order_id":2,"amount":200,"status":"pending"}'