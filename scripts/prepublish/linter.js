var exec = require('shelljs').exec;
var path = require('path');
var eslint = '"node_modules/.bin/eslint"';

//run linter
console.log('linting..');
var cmd = eslint + ' -c .eslintrc --color ' + path.join(__dirname, '../../src/**/*.js');
console.log(cmd);
exec(cmd, {
  async: true
});
console.log(' - done.');
