'use strict';
//this file is not included in the build.
//use it for messing around.
const nlp = require('./src/index');
// require('./src/log').enable();

//bug 1.
// const m = nlp('what is 10 and 10?');
// m.values().toNumber();
// m.check();


// const m = nlp(`he is cool. Ben's cool. The frog is cool. Cameron's cool.`);
// const m = nlp(`he is cool.`);
// let r = m.contractions().expand();
// // let r = m.contractions().contract(); //.expand();
// console.log(m.plaintext());

const r = nlp('She could\'ve seen.');
r.contractions().check();
// r.check();
// console.log(r.plaintext());
