FROM node:22

WORKDIR /var/www/front/
RUN yarn install

CMD ["yarn", "start"]
