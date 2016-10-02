'use strict';

const koa = require('koa');
const app = koa();


/*
	Middleware functions return a generator which receives the 'next' control flow function as a first parameter
 */

const mwResponseTime = function(){
	return function *(next){
		const start = new Date;
		yield next;
		// Flow pauses here until request flow 'unwinds'
		
		const ms = new Date - start;
		this.set('X-Response-Time', ms + 'ms');
	}
};

const mwLogger = function(){
	return function *(next){
		const start = new Date;
		yield next;
		// Flow pauses here until request flow 'unwinds'
		
		const ms = new Date - start;
		console.log('%s %s - %s ms', this.method, this.url, ms)
	};
};

// Tell Koa to use the middleware generatorFunctions created
app.use(mwResponseTime());
app.use(mwLogger());

// Response
app.use(function *(){
	this.body = 'Koa says: Hello world!\n\n I\'ve calculated the response time, sent it as a response header and logged it to console with some extra info ;)';
});

// Listen on 3000
app.listen(3000);
console.log('App listening on port 3000');

