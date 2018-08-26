# https://github.com/elastic/kibana-docker
FROM docker.elastic.co/kibana/kibana-oss:6.3.0

# Add your kibana plugins setup here
# Example: RUN kibana-plugin install <name|url>
COPY index.js /usr/share/kibana/src/core_plugins/kibana/index.js

RUN rm /usr/share/kibana/optimize/bundles/kibana.bundle.js
#RUN rm /usr/share/kibana/optimize/bundles/commons.bundle.js
