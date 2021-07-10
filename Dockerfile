FROM keymetrics/pm2:latest

# Bundle APP files
COPY src/ src/
COPY config.json .
COPY package.json .
COPY pm2.json .

# Install curl
RUN apk update
RUN apk upgrade
RUN apk add curl

# set timezone
ENV TZ Asia/Shanghai
RUN apk add tzdata && cp /usr/share/zoneinfo/${TZ} /etc/localtime \
    && echo ${TZ} > /etc/timezone

# Install app dependencies
ENV NPM_CONFIG_LOGLEVEL warn
RUN npm install --production

CMD [ "pm2-runtime", "start", "pm2.json"]