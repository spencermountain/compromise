require('shelljs/global');
var tape = './node_modules/tape/bin/tape';
var tapSpec = './node_modules/tap-spec/bin/cmd.js --color';

//run tests server-side
exec(tape + ' \'./test/unit/**/*.test.js\' | ' + tapSpec);

//do code-coverage too
// var nyc = './node_modules/nyc/bin/nyc.js';
// var cmd = tape + ' ./test/unit/**/*.test.js ';
// cmd += ' | tee >(' + tapSpec + ') >(' + nyc + ')';
// exec(cmd);
// exec(nyc + ' --reporter=text-summary npm test');
