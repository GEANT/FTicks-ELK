FROM haproxy

RUN apt-get update && apt-get -y install curl netcat

COPY config/haproxy.cfg /usr/local/etc/haproxy/haproxy.cfg
COPY config/fticks.index /fticks.index
COPY config/fticks.template /fticks.template
COPY config/docker-override-entrypoint.sh /docker-override-entrypoint.sh

ENTRYPOINT [ "/docker-override-entrypoint.sh" ]
