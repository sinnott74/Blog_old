# Progressive Web Application Shell Architecture

[![Build Status](https://travis-ci.org/sinnott74/Sinnott.svg?branch=master)](https://travis-ci.org/sinnott74/Sinnott)


# Sinnott
This is my personal site to curate a blog & various works.

It doubles a site to test out various bits of code.

The site is built with a react/redux web frontend & an node/express backend

## Install

```npm install```

## Run
### Dev

```npm run start:client```

to run the react webclient using webpack-dev-server on port 8081, with all requests to `/api*` proxied to port `localhost:8080/api*`

```npm run start:server```

to run the express server on port 8080

### Production

```npm run start```


to build the react web frontend, served by an express backend all running on port 8080