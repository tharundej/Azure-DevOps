FROM --platform=linux/arm64/v8 node:12.12.0-alpine

 

# set working directory

#WORKDIR /

 

# add `/app/node_modules/.bin` to $PATH

ENV PATH /app/node_modules/.bin:$PATH

 

# install app dependencies

COPY package.json ./

COPY package-lock.json ./

COPY . .

RUN npm install

ENV TZ Asia/India

 

# add app

COPY . .

 

# start app

CMD ["npm", "start"]
