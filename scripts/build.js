require('shelljs/global');
config.silent = true;
var fs = require('fs');
//use paths, so libs don't need a -g
var browserify = './node_modules/.bin/browserify';
var derequire = './node_modules/derequire/bin/cmd.js';
var uglify = './node_modules/uglify-js/bin/uglifyjs';
var eslint = './node_modules/eslint/bin/eslint.js';

var pkg = JSON.parse(fs.readFileSync('./package.json', 'utf8'));

//first, run linter
var child = exec(eslint + ' -c .eslintrc --color ./src/**', {
  async: true
});
child.stdout.on('error', function() {
  //(exit if linter finds errors)
  process.exit();
});

//final build locations
var banner = '/* nlp_compromise v' + pkg.version + '\n   github.com/nlp-compromise\n   MIT\n*/\n';
var uncompressed = './builds/nlp_compromise.js';
var compressed = './builds/nlp_compromise.min.js';

//cleanup. remove old builds
exec('rm -rf ./builds && mkdir builds');

//add a header, before our sourcecode
echo(banner).to(uncompressed);
echo(banner).to(compressed);

//browserify + derequire
var cmd = browserify + ' ./src/index.js --standalone nlp';
cmd += ' -t [ babelify --presets [ es2015 stage-2 ] ]';
cmd += ' | ' + derequire;
cmd += ' >> ' + uncompressed;
// console.log(cmd);
exec(cmd);

//uglify
cmd = uglify + ' ' + uncompressed + ' --mangle --compress ';
cmd += ' >> ' + compressed;
exec(cmd); // --source-map ' + compressed + '.map'

//print filesizes
var stats = fs.statSync(compressed);
var fileSize = (stats['size'] / 1000.0).toFixed(2);
console.log('\n\n' + fileSize + 'kb');
