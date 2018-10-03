var shelljs = require('shelljs');
var chalk = require('chalk');
var fileSize = require('../lib/filesize');
var pkg = require('../../package.json');
var exec = shelljs.exec;
var echo = shelljs.echo;

var browserify = '"node_modules/.bin/browserify"';
var derequire = '"node_modules/.bin/derequire"';
var babili = '"node_modules/.bin/babili"';

var es6 = './builds/compromise.es6.js';
var es6min = './builds/compromise.es6.min.js';

var banner = '/* compromise v' + pkg.version + '\n   http://compromise.cool\n   MIT\n*/\n';
echo(banner).to(es6);

console.log(chalk.yellow(' 🕑 creating es6 build..'));

//es6 main (browserify)
var cmd = browserify + ' "./src/index.js" --standalone nlp';
// cmd += ' -p bundle-collapser/plugin';
cmd += ' | ' + derequire;
cmd += ' >> ' + es6;
exec(cmd);

//es6min (babili)
cmd = babili + ' ' + es6;
cmd += ' >> ' + es6min;
exec(cmd);

//remove the first one
console.log(chalk.green(' done!    es6min ' + fileSize(es6min) + 'k\n'));
