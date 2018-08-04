FROM httpd:latest

RUN htpasswd -b -c "/usr/local/apache2/conf/passwd" geant jra3t1

COPY config/httpd.conf /usr/local/apache2/conf/httpd.conf
