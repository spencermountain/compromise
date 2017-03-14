require('shelljs/global');
var chalk = require('chalk');
var fileSize = require('../lib/filesize');
var pkg = require('../../package.json');

var browserify = '"node_modules/.bin/browserify"';
var derequire = '"node_modules/.bin/derequire"';
var uglify = '"node_modules/.bin/uglifyjs"';

var es5 = './builds/compromise.js';
var es5min = './builds/compromise.min.js';


console.log(chalk.yellow(' 🕑 creating es5 build..'));

var banner = '/* compromise v' + pkg.version + '\n   github.com/nlp-compromise\n   MIT\n*/\n';
exec('echo ' + banner + ' > ' + es5);
exec('echo ' + banner + ' > ' + es5min);

//es5 main (browserify + derequire)
cmd = browserify + ' "./src/index.js" --standalone nlp';
cmd += ' -t [ babelify --presets [ es2015 stage-2 ] --plugins [transform-es3-property-literals transform-es3-member-expression-literals] ]';
cmd += ' | ' + derequire;
cmd += ' >> ' + es5;
exec(cmd);

//es5 min (uglify)
cmd = uglify + ' ' + es5 + ' --mangle --compress ';
cmd += ' >> ' + es5min;
exec(cmd);

console.log(chalk.green(' done!    ' + fileSize(es5min) + 'k\n'));
