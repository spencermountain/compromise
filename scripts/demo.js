var exec = require('shelljs').exec
var fileServer = './node_modules/.bin/http-server';

exec(fileServer + ' demo -o -c-1');
