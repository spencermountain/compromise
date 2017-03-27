require('shelljs/global');
var chalk = require('chalk');
var fileSize = require('../lib/filesize');
// var pkg = require('../../package.json');

var browserify = '"node_modules/.bin/browserify"';
var derequire = '"node_modules/.bin/derequire"';
// var babili = '"node_modules/.bin/babili"';

var es6 = './builds/compromise.es6.js';

// var banner = '/* compromise v' + pkg.version + '\n   github.com/nlp-compromise\n   MIT\n*/\n';
// exec('echo ' + banner + ' > ' + es6);

console.log(chalk.yellow(' 🕑 creating es6 build..'));
exec('rm ' + es6);

//es6 main (browserify)
var cmd = browserify + ' "./src/index.js" --standalone nlp';
cmd += ' | ' + derequire;
cmd += ' >> ' + es6;
exec(cmd);

//es6min (babili)
// cmd = babili + ' ' + es6;
// cmd += ' >> ' + es6min;
// exec(cmd);

//remove the first one
console.log(chalk.green(' done!    ' + fileSize(es6) + 'k\n'));
