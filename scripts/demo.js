var exec = require('shelljs').exec;

exec('npm i http-server'); //😊
var fileServer = './node_modules/.bin/http-server';

exec(fileServer + ' -o -c-1');
