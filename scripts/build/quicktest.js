var assert = require('assert');
var chalk = require('chalk');

console.log(chalk.green('\n==sanity-test builds=='));
//sanity-test the builds
var libs = [
  require('../../builds/compromise.js'),
  require('../../builds/compromise.min.js'),
  require('../../builds/compromise.es6.min.js')
];
libs.forEach((nlp, i) => {
  console.log(chalk.green('  - - #' + i));
  var r = nlp('John and Joe walked to the store');
  assert(r.people().data().length === 2);
  assert(r.verbs().data().length === 1);
});
console.log(chalk.green('\n  👍'));
