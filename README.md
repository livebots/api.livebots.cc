api.livebots.cc
===============


## How to run in localhost

1. Install mongoDB
2. Run mongoDB
```bash
$ mongod
```
3. Set MONGOURL env to 'mongodb://localhost/livebots_dev'
```bash
$ export MONGOURL=mongodb://localhost/livebots_dev
```
4. Start
```bash
$ npm start
```



## How to deploy
```bash
$ git push livebots master
```