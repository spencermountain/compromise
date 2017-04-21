require('shelljs/global');
const path = require('path');
var eslint = 'node_modules/.bin/eslint';

//run linter
console.log('linting..');
const cmd = eslint + ' -c .eslintrc --color ' + path.join(__dirname, '../../src/**/*.js');
exec(cmd, {
  async: true
});
console.log(' - done.');
