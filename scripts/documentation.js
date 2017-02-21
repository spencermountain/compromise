//generate new docs
require('shelljs/global');
config.silent = true;
// var jsdoc = './node_modules/jsdoc-parse/bin/cli.js';

// var transforms = [
//   './src/term/transforms/**/*.js',
//   './src/sentence/transforms/**/*.js',
//   './src/text/transforms/**/*.js'
// ].reduce(function(h, path) {
//   var arr = JSON.parse(exec(jsdoc + ' -f ' + path));
//   for (var i = 0; i < arr.length; i++) {
//     h[arr[i].id] = arr[i].description;
//   }
//   return h;
// }, {});
// echo(JSON.stringify(transforms, null, 2)).to('./docs/transforms.json');
