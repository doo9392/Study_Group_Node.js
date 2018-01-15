var nconf = require('nconf');

nconf.env(); //npm install nconf

console.log('OS 환경 변수의 값 : %s', nconf.get('OS'));