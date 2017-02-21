require('shelljs/global');
var nyc = './node_modules/nyc/bin/nyc.js';
var codacity = './node_modules/.bin/codacy-coverage';
var tape = './node_modules/tape/bin/tape';
var tapMin = './node_modules/tap-min/bin/tap-min';
var test = tape + ' \'./test/unit/**/*.test.js\' | ' + tapMin;

//run all the tests
console.log('\n 🏃  running tests..');
// exec(nyc + ' --reporter=text-summary ' + test);
exec(nyc + ' --reporter=html ' + test);

//publish results for codacity
console.log('\n\n\nPublishing results to codacity...\n');
var cmd = nyc + ' report --reporter=text-lcov ' + test + ' | ' + codacity;
exec(cmd);
