'use strict';

const koa = require('koa');

const app = koa();

app.use(function *(){
	this.body = 'Koa Says: Hello World!';
});

app.listen(3000);
console.log('App listening on port 3000');