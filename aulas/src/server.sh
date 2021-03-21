#!/usr/bin/env bash
RESPONSE="HTTP/1.1 200 OK\r\nConnection: keep-alive\r\n\r\n${2:-"<h1>oii</h1>"}\r\n"
while { echo -en "$RESPONSE"; echo "${1:-8080}"; } | nc -l -p 8080; do
echo "================================================"
done
