'use strict';
//this file is not included in the build.
//use it for messing around.
const nlp = require('./src/index');
require('./src/logger').enable();
// var m = nlp('4:00');
// m.values().toNumber();
// $56.04
// m.check();
// m.values().toNiceNumber();

var r = nlp('Sep-2012');
// var dates = r.dates().parse();
// console.log(dates[0]);
r.check();
// var m = r.match('#Month #Value #Cardinal');
// let values = m.values().check().parse();
// console.log(values);
