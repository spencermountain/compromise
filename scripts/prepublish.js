require('shelljs/global');
var browserify = './node_modules/.bin/browserify';
var tape = './node_modules/tape/bin/tape';
var tapSpec = './node_modules/tap-spec/bin/cmd.js';

//run tests server-side
exec(tape + ' ./test/unit_test/**/*_test.js | ' + tapSpec)

//test all versions serverside, client-side
exec(tape + ' ./test/prerelease/index.js | ' + tapSpec)

//run tests on the client-side
var cmd = browserify + ' ./test/unit_test/*_test.js '
cmd += '-o ./test/browser_test/compiled_tests.js '
cmd += ' && ' + fileServer + ' test/browser_test -o -c-1'
exec(cmd)
