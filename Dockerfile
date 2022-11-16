FROM ubuntu:22.04

# install nodejs 
RUN apt-get update

RUN apt-get install -y curl

RUN curl -fsSL https://deb.nodesource.com/setup_16.x | bash - &&\
    apt-get install -y nodejs

WORKDIR /app
# install package and run

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

RUN apt-get install -y ./google-chrome-stable_current_amd64.deb 
CMD ["npm","start"]