require('shelljs/global');
config.silent = true;
var fs = require('fs');
//use paths, so libs don't need a -g
var browserify = '"node_modules/.bin/browserify"';
var derequire = '"node_modules/.bin/derequire"';
var uglify = '"node_modules/.bin/uglifyjs"';
var babili = '"node_modules/.bin/babili"';
var pkg = JSON.parse(fs.readFileSync('./package.json', 'utf8'));

var banner = '/* compromise v' + pkg.version + '\n   github.com/nlp-compromise\n   MIT\n*/\n';

//final build locations
var es5 = './builds/compromise.js';
var es5min = './builds/compromise.min.js';
var es6 = './builds/compromise.es6.js';
var es6min = './builds/compromise.es6.min.js';

//cleanup. remove old builds
exec('rm -rf ./builds && mkdir builds');

//add a header, before our sourcecode
exec('echo ' + banner + ' > ' + es5);
exec('echo ' + banner + ' > ' + es5min);
exec('echo ' + banner + ' > ' + es6);
exec('echo ' + banner + ' > ' + es6min);

//es6 main (browserify)
var cmd = browserify + ' "./src/index.js" --standalone nlp';
cmd += ' | ' + derequire;
cmd += ' >> ' + es6;
exec(cmd);

//es6min (babili)
cmd = babili + ' ' + es6;
cmd += ' >> ' + es6min;
exec(cmd);

//es5 main (browserify + derequire)
cmd = browserify + ' "./src/index.js" --standalone nlp';
cmd += ' -t [ babelify --presets [ es2015 stage-2 ] ]';
cmd += ' | ' + derequire;
cmd += ' >> ' + es5;
exec(cmd);

//es5 min (uglify)
cmd = uglify + ' ' + es5 + ' --mangle --compress ';
cmd += ' >> ' + es5min;
exec(cmd);

var fileSize = function(src) {
  var stats = fs.statSync(src);
  return (stats['size'] / 1000.0).toFixed(2) + 'kb';
};

//print filesizes
console.log('\n');
console.log('    es6 ' + fileSize(es6));
console.log(' -  min ' + fileSize(es6min));
console.log('\n');
console.log('    es5 ' + fileSize(es5));
console.log(' -  min ' + fileSize(es5min));
console.log('\n');
