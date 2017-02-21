require('shelljs/global');
var browserify = './node_modules/.bin/browserify';
var tape = './node_modules/tape/bin/tape';
var tapSpec = './node_modules/tap-spec/bin/cmd.js';
var fileServer = './node_modules/http-server/bin/http-server';

//run tests server-side
exec(tape + ' ./test/unit/**/*_test.js | ' + tapSpec);

//test all versions serverside, client-side
exec(tape + ' ./test/prerelease/index.js | ' + tapSpec);

//generate new docs
// exec('node ./documentation.js');

//run tests on the client-side
var cmd = browserify + ' ./test/unit/*.test.js ';
cmd += '-o ./test/client/compiled_tests.js ';
cmd += ' && ' + fileServer + ' test/client -o -c-1';
exec(cmd);
