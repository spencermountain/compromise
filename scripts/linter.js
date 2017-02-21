require('shelljs/global');
config.silent = true;

var eslint = '"node_modules/.bin/eslint"';

//run linter
exec(eslint + ' -c .eslintrc --color "./src/**"', {
  async: true
});
