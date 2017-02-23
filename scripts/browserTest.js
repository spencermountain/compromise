require('shelljs/global');
var browserifyGlob = '"./node_modules/.bin/browserify-glob"';
var fileServer = '"./node_modules/.bin/http-server"';

//run tests on the client-side
var out = './test/client/compiled_tests.js';
var cmd = browserifyGlob + ' "./test/unit/**/*.test.js" > ' + out;
cmd += ' && ' + fileServer + ' test/client -o -c-1';
exec(cmd);

//then cleanup that god-awful file in our sourcecode
// exec('rm ' + out);
