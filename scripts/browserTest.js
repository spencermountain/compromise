require('shelljs/global');
var browserify = './node_modules/.bin/browserify';
var tape = './node_modules/tape/bin/tape';
var tapSpec = './node_modules/tap-spec/bin/cmd.js';
var fileServer = './node_modules/.bin/http-server';

//run tests on the client-side
var cmd = browserify + ' ./test/unit/**/*.test.js ';
cmd += '-o ./test/client/compiled_tests.js ';
cmd += ' && ' + fileServer + ' test/client -o -c-1';
exec(cmd);
