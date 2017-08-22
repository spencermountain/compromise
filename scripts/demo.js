var exec = require('shelljs').exec
var fileServer = './node_modules/.bin/http-server'

exec(fileServer + ' -o -c-1')
