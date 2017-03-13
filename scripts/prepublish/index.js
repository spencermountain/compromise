require('shelljs/global');
const assert = require('assert');
const chalk = require('chalk');


console.log(chalk.green('\n==checking branch=='));
const branch = exec('git status | grep "On branch" | cut -c 11-').stdout;
if (branch !== 'master') {
  console.log(chalk.red('\n\n   ============ hey, not on master branch ===========\n\n'));
}


console.log(chalk.green('\n==sanity-test builds=='));
//sanity-test the builds
var libs = [
  require('../../builds/compromise.js'),
  require('../../builds/compromise.min.js'),
  require('../../builds/compromise.es6.min.js'),
];
libs.forEach((nlp) => {
  const r = nlp('John and Joe walked to the store');
  assert(r.people().data().length === 2);
  assert(r.verbs().data().length === 1);
});

//run linter
console.log(chalk.green('\n==run linter=='));
require('./linter');
