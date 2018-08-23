FROM haproxy

RUN apt-get update && apt-get -y install curl netcat python3 python3-requests

COPY config/haproxy.cfg /usr/local/etc/haproxy/haproxy.cfg
COPY config/fticks.index /fticks.index
COPY config/fticks.template /fticks.template
COPY config/docker-override-entrypoint.sh /docker-override-entrypoint.sh
COPY config/kibana-importer.py /kibana-importer.py
COPY config/import.json /import.json

ENTRYPOINT [ "/docker-override-entrypoint.sh" ]
