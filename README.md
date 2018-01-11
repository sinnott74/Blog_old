# Sinnott
This is my personal site to curate a blog & various works.

It doubles a site to test out various bits of code.

The site is built with a react/redux web frontend & an node/express backend

## Install

```npm install```

## Run
### Dev

```npm run start:client```

to run the react webclient using webpack-dev-server on port 8080, with all requests to `/api*` proxied to port `localhost:8081/api*`

```npm run start:server```

to run the express server on port 8081

### Production

```npm run start```


to build the react web frontend, served by an express backend all running on port 8081