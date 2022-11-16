FROM ubuntu:22.04

COPY package*.json
# install nodejs 



# install package and run
RUN npm install

COPY . .

RUN sudo apt-get update
RUN sudo apt-get install ./google-chrome-stable_current_amd64.deb -y
CMD ["npm","start"]