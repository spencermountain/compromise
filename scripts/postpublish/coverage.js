var exec = require('shelljs').exec;
var codecov = '15039ad1-b495-48cd-b4a0-bcf124c9b318'; //i don't really care if you steal this.

//run all the tests
let cmd = `./node_modules/.bin/nyc --reporter=text-lcov ./node_modules/.bin/tape ./test/unit/**/*.test.js > coverage.lcov && ./node_modules/.bin/codecov -t ${codecov}`;
exec(cmd);
console.log('\n 🏃 done!');
