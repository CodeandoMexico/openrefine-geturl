# ## Google Refine 2.5
#
# ### Usage Examples
#
# Starting the container:
#
#     docker run --name="refine" -p 3335:3333  openrefine
#
# Find out which port to connect to:
#
#     docker ps
#
# ### Links
#
# * Homepage: http://openrefine.org/index.html
# * FAQ: https://github.com/OpenRefine/OpenRefine/wiki/FAQ
# * Wiki: https://github.com/OpenRefine/OpenRefine/wiki

FROM ubuntu:precise
MAINTAINER Miguel Angel Gordian <miguel.angel@codeandomexico.org>

ENV DEBIAN_FRONTEND noninteractive
ENV PORT 3333
ENV HOST 0.0.0.0

# Java 7 and wget
RUN echo "deb http://archive.ubuntu.com/ubuntu precise universe" >> /etc/apt/sources.list && \
    apt-get update && \
    apt-get -y install openjdk-7-jre-headless wget tar unzip


# Install open refine 
RUN wget https://github.com/OpenRefine/OpenRefine/releases/download/2.5/google-refine-2.5-r2407.tar.gz -O openrefine.tar.gz && \
    tar zxf openrefine.tar.gz -C / && \
    mv google-refine-2.5 open-refine && \
    rm openrefine.tar.gz

# Install geturl extension
ADD . /open-refine/webapp/extensions/geturl

# Init open refine
WORKDIR /open-refine

VOLUME ["/mnt/refine"]

ENTRYPOINT ./refine -p $PORT -d /mnt/refine -i $HOST
