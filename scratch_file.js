'use strict';
//this file is not included in the build.
//use it for messing around.
const nlp = require('./src/index');
// require('./src/logger').enable();

var str = 'John xoo, John fredman, john xoo, John davis';
var r = nlp(str);
r = r.people();
r.unique();
r.check();
