require('shelljs/global');
var tape = './node_modules/tape/bin/tape';
var tapSpec = './node_modules/tap-spec/bin/cmd.js --color';

//run tests server-side
exec(tape + ' ./test/unit/*.js | ' + tapSpec);
