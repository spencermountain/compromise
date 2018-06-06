var exec = require('shelljs').exec;
//use paths, so libs don't need a -g
var browserify = './node_modules/.bin/browserify';
var derequire = './node_modules/derequire/bin/cmd.js';

exec('du -a ./src | sort -n -r | grep .js | head -n 10');

//haha-engineering
exec('npm i uglifyify --no-save');

exec('rm -rf ./viz');
exec('mkdir viz');

//make the bundle with full-paths
var cmd = browserify + ' --full-paths ./src/index.js --standalone nlp';
cmd += ' -t [ babelify --presets [ env ] ]';
cmd += ' -t [ uglifyify --compress --mangle ]';
cmd += ' | ' + derequire;
cmd += ' >> ./viz/bundle.js';
exec(cmd);

exec('discify ./viz/bundle.js > ./viz/output.html');

exec('google-chrome ./viz/output.html');
