require('shelljs/global');
var cmd = 'rollup ./src/index --format umd --name "compromise" --output ./builds/bundle.js';
exec(cmd);
