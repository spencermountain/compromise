var exec = require('shelljs').exec;
var assert = require('assert');
var chalk = require('chalk');

console.log(chalk.green('\n==checking branch=='));
var branch = exec('git status | grep "On branch" | cut -c 11-').stdout;
branch = branch.trim();
if (branch !== 'master') {
  console.log(chalk.red('\n\n   ============ hey, not on master branch ===========\n\n'));
}

console.log(chalk.green('\n==sanity-test builds=='));
//sanity-test the builds
var libs = [
  require('../../builds/compromise.js'),
  require('../../builds/compromise.min.js')
// require('../../builds/compromise.es6.min.js')
];
libs.forEach(nlp => {
  var r = nlp('John and Joe walked to the store');
  assert(r.people().data().length === 2);
  assert(r.verbs().data().length === 1);
});

//run linter
console.log(chalk.green('\n==run linter=='));
require('./linter');

//test builds
console.log(chalk.green('\n==test of builds=='));
require('./testBuild');
