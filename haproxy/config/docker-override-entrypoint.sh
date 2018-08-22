#!/bin/bash

waitport() {
    while ! nc -z $1 $2 ; do sleep 1 ; done
}

waitport elasticsearch 9200
waitport kibana 5601

curl -X PUT -H 'Content-Type: application/json' http://elasticsearch:9200/_template/fticks_template -d '@/fticks.template'

curl -X PUT -H 'Content-Type: application/json' http://elasticsearch:9200/fticks -d '@/fticks.index'

curl -f -XPOST -H "Content-Type: application/json" -H "kbn-xsrf: anything" \
  "http://kibana:5601/api/saved_objects/index-pattern/fticks*" \
  -d"{\"attributes\":{\"title\":\"fticks*\",\"timeFieldName\":\"@timestamp\"}}"

curl -XPOST -H "Content-Type: application/json" -H "kbn-xsrf: anything" \
  "http://kibana:5601/api/kibana/settings/defaultIndex" \
  -d"{\"value\":\"fticks*\"}"

./kibana-importer.py --json import.json  --kibana-url http://kibana:5601

/docker-entrypoint.sh haproxy -f /usr/local/etc/haproxy/haproxy.cfg

