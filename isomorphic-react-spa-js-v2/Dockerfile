FROM node:alpine as releaser

ENV HOME=/app
ENV NODE_ENV production

WORKDIR $HOME
COPY package.json $HOME/package.json
RUN npm install
COPY . $HOME
RUN npm run build

########################################################################
FROM nginx:alpine

ENV HOME=/app
WORKDIR $HOME

COPY --from=releaser $HOME/build /usr/share/nginx/html
