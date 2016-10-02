'use strict';

const koa = require('koa');

const app = koa();

app.use(function *(){

	let n = ~~this.cookies.get('view') + 1;
	console.log(n);
	this.cookies.set('view', n);
	this.body = 'cookie set';
});


app.listen(3000);