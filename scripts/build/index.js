require('shelljs/global');
config.silent = true;
const path = require('path');


//pack the tries
require('./pack');

//cleanup. remove old builds
exec('rm -rf ./builds && mkdir builds');


require('./es6-build');
require('./es5-build');

//sanity test them
require('./quicktest');
// require(path.join(__dirname, '../../builds/compromise.es6.min.js'));
// require(path.join(__dirname, '../../builds/compromise.js'));
// require(path.join(__dirname, '../../builds/compromise.min.js'));
