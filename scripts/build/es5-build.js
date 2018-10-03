var fs = require('fs');
var exec = require('shelljs').exec;
var chalk = require('chalk');
var UglifyJS = require('uglify-js');

var pkg = require('../../package.json');
var fileSize = require('../lib/filesize');

var browserify = '"node_modules/.bin/browserify"';
var derequire = '"node_modules/.bin/derequire"';

var es5 = './builds/compromise.js';
var es5min = './builds/compromise.min.js';

console.log(chalk.yellow(' 🕑  creating es5 build..'));

var banner = '/* compromise v' + pkg.version + '\n   github.com/nlp-compromise/compromise\n   MIT\n*/\n';

//es5 main (browserify + derequire)
cmd = browserify + ' "./src/index.js" --standalone nlp';
// cmd += ' -p bundle-collapser/plugin';
cmd += ' -t [ babelify --presets [ env ] ]';
cmd += ' | ' + derequire;
cmd += ' >> ' + es5;
exec(cmd);


var code = fs.readFileSync(es5).toString();

var result = UglifyJS.minify(code, {
  output: {
    beautify: false,
    preamble: banner
  },
  compress: {
    passes: 2,
  }
});
fs.writeFileSync(es5min, result.code);

console.log(chalk.green(' done!    es5min ' + fileSize(es5min) + 'k\n'));
