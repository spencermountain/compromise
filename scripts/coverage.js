const exec = require('shelljs').exec
const codecov = '15039ad1-b495-48cd-b4a0-bcf124c9b318' //i don't really care if you steal this.

//let cmd=`./node_modules/.bin/nyc --reporter=text ./node_modules/.bin/tape ./test/**/*.test.js`
//run all the tests
const cmd = `./node_modules/.bin/nyc --reporter=text-lcov ./node_modules/.bin/tape ./tests/**/*.test.js > coverage.lcov && ./node_modules/.bin/codecov -t ${codecov}`
exec(cmd)
console.log('\n 🏃 done!')
