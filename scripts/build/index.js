var exec = require('shelljs').exec;

//pack the tries
require('../pack');

//cleanup. remove old builds
exec('rm -rf ./builds && mkdir builds');

//build each version
require('./es6-build');
require('./es5-build');

//sanity test them
require('./quicktest');
