var exec = require('shelljs').exec;
var browserifyGlob = '"./node_modules/.bin/browserify-glob"';
var fileServer = '"./node_modules/.bin/http-server"';

//run tests on the client-side
var out = './test/client/compiled_tests.js';
var cmd = browserifyGlob + ' "./test/unit/**/*.test.js" ';
cmd += ' -t [ babelify --presets [ env ]] > ' + out;
cmd += ' && ' + fileServer + ' test/client -o -c-1';
exec(cmd);

//then cleanup that god-awful file in our sourcecode
// exec('rm ' + out);


//es5 main (browserify + derequire)
// cmd = lib.browserify + ' "./src/index.js" --standalone nlp';
// cmd += ' | ' + lib.derequire;
// cmd += ' >> ' + path.es5;
// exec(cmd);
