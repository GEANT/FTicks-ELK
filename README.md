# FTicks-ELK
This is an SAML2 FTicks collector and forwarder. It is intended as a national federation level collector, that collects national IdPs FTICKS and forwards them towards the central eduGAIN collector.

Useage:
docker-compose build
docker-compose up

It listens to port 80 for public viewers (limited only to viewing), and on port 81 for fully accessible kibana (inital user: geant, pass: jra3t1).

