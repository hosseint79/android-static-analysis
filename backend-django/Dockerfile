FROM python:3.10

# RUN cd jdk && \
#   dpkg -i jdk-18_linux-x64_bin.deb && \
#   update-alternatives --install /usr/bin/java java /usr/lib/jvm/jdk-14/bin/java 1 && \
#   update-alternatives --install /usr/bin/javac javac /usr/lib/jvm/jdk-14/bin/javac 1 && \
#   ls;


ENV PYTHONUNBUFFERED 1
RUN mkdir /code
WORKDIR /code
ADD requirements.txt /code/
RUN pip install -r requirements.txt
ADD . /code/

ENTRYPOINT ["sh","/code/run_bestoon.sh"]


RUN apt update && \
  wget --no-check-certificate -c --header "Cookie: oraclelicense=accept-securebackup-cookie" https://download.oracle.com/java/17/latest/jdk-17_linux-x64_bin.deb  && \
  apt install ./jdk-17_linux-x64_bin.deb -y && \  
  update-alternatives --install /usr/bin/java java /usr/lib/jvm/jdk-17/bin/java 1 && \
  update-alternatives --install /usr/bin/javac javac /usr/lib/jvm/jdk-17/bin/javac 1 && \
  ls;

