var exec = require('shelljs').exec;
var tape = '"node_modules/.bin/tape"';
// var tapSpec = '"node_modules/.bin/tap-spec" --color';
var tapDot = '"node_modules/.bin/tap-dot"';
// var tapMin = '"node_modules/.bin/tap-min" --color';

//the quotations here are strangely-important
exec(tape + ' "./test/unit/**/*.test.js" | ' + tapDot);

// var tapMin = '"node_modules/.bin/tap-min" --color';
// exec(tape + ' "./test/unit/**/*.test.js" | ' + tapMin);
