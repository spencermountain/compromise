require('shelljs/global');
var tape = '"node_modules/.bin/tape"';
var tapSpec = '"node_modules/.bin/tap-spec" --color';

//the quotations here are strangely-important
exec(tape + ' "./test/unit/**/*.test.js" | ' + tapSpec);
