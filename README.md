[![Build Status](https://travis-ci.org/sinnott74/Blog.svg?branch=master)](https://travis-ci.org/sinnott74/Blog)

# Sinnott

This is my personal site to curate a blog & various works.

It doubles a site to test out various bits of code.

The site is built with a react/redux web frontend & an node/express/psql backend

## Install

`yarn install`

## Run

### Dev

`yarn start:dev`

to run the react webclient using webpack-dev-server on port 3000, with all requests to `/api*` proxied to port `localhost:8080/api*` on which the node express server is running.

### Production

`yarn start:prod`

to build the react web frontend, served by an express backend all running on port 8080
