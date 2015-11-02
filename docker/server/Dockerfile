# Docker Container : app (node.js app runner)
FROM xdrum/nginx-extras

MAINTAINER Pierre-Antoine "leny" Delnatte <info@flatland.be>

RUN rm -rf /etc/nginx/conf.d
RUN rm -rf /etc/nginx/sites-enabled
ADD ./nginx.conf /etc/nginx/nginx.conf
