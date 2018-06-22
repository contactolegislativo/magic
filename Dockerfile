FROM ubuntu:latest

RUN apt-get -y update && \
  apt-get -y install curl libcairo2-dev libjpeg-dev libpango1.0-dev libgif-dev build-essential g++ && \
  curl -sL https://deb.nodesource.com/setup_6.x | bash && \
    apt-get install -y nodejs build-essential

WORKDIR /magic

EXPOSE 80

CMD ["/bin/bash"]
