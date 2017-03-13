require('shelljs/global');
config.silent = false;
//use paths, so libs don't need a -g
var browserify = './node_modules/.bin/browserify';
var derequire = './node_modules/derequire/bin/cmd.js';

exec('du -a ./src | sort -n -r | grep .js | head -n 10');

//haha-engineering
exec('npm i uglifyify');

exec('rm -rf ./viz');
exec('mkdir viz');

//make the bundle with full-paths
var cmd = browserify + ' --full-paths ./src/index.js --standalone nlp';
cmd += ' -t [ babelify --presets [ es2015 stage-2 ] ]';
cmd += ' -t [ uglifyify --compress --mangle ]';
cmd += ' | ' + derequire;
cmd += ' >> ./viz/bundle.js';
exec(cmd);

exec('discify ./viz/bundle.js > ./viz/output.html');

exec('google-chrome ./viz/output.html');
