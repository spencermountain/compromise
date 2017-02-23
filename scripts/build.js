require('shelljs/global');
config.silent = true;
var fs = require('fs');

var pkg = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
var banner = '/* compromise v' + pkg.version + '\n   github.com/nlp-compromise\n   MIT\n*/\n';

//use paths, so libs don't need a -g
var lib = {
  browserify : '"node_modules/.bin/browserify"',
  derequire : '"node_modules/.bin/derequire"',
  uglify : '"node_modules/.bin/uglifyjs"',
  babili : '"node_modules/.bin/babili"'
};

//final build locations
var path = {
  es5 : './builds/compromise.js',
  es5min : './builds/compromise.min.js',
  es6 : './builds/compromise.es6.js',
  es6min : './builds/compromise.es6.min.js',
};

//cleanup. remove old builds
exec('rm -rf ./builds && mkdir builds');

//add a header, before our sourcecode
exec('echo ' + banner + ' > ' + path.es5);
exec('echo ' + banner + ' > ' + path.es5min);
exec('echo ' + banner + ' > ' + path.es6min);

//es6 main (browserify)
var cmd = lib.browserify + ' "./src/index.js" --standalone nlp';
cmd += ' | ' + lib.derequire;
cmd += ' >> ' + path.es6;
exec(cmd);

//es6min (babili)
cmd = lib.babili + ' ' + path.es6;
cmd += ' >> ' + path.es6min;
exec(cmd);
exec('rm ' + path.es6);

//es5 main (browserify + derequire)
cmd = lib.browserify + ' "./src/index.js" --standalone nlp';
cmd += ' -t [ babelify --presets [ es2015 stage-2 ] --plugins [transform-es3-property-literals transform-es3-member-expression-literals] ]';
cmd += ' | ' + lib.derequire;
cmd += ' >> ' + path.es5;
exec(cmd);

//es5 min (uglify)
cmd = lib.uglify + ' ' + path.es5 + ' --mangle --compress ';
cmd += ' >> ' + path.es5min;
exec(cmd);

var fileSize = function(src) {
  var stats = fs.statSync(src);
  return (stats['size'] / 1000.0).toFixed(2) + 'kb';
};

//print filesizes
console.log('\n');
console.log('es6.min ' + fileSize(path.es6min));
console.log('\n');
console.log('    es5 ' + fileSize(path.es5));
console.log(' -  min ' + fileSize(path.es5min));
console.log('\n');
