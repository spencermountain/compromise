'use strict';
//this file is not included in the build.
//use it for messing around.
const nlp = require('./src/index');
require('./src/log').enable();

//bug 1.
// const m = nlp('what is 10 and 10?');
// m.values().toNumber();
// m.check();

var text = `
for Morgan Schneiderlin, the transfer.
`;
let arr = nlp(text).check().topics().data();
console.log(arr);
