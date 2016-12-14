'use strict';
//this file is not included in the build.
//use it for messing around.
// const freshPrince = require('./test/unit/lib/freshPrince');

// setInterval(() => {
//   console.log('-');
// }, 50);

setTimeout(() => {

  console.log('==pre');
  const nlp = require('./src/index');
  console.log('==end');
  // require('./src/logger').enable();
  // var m = nlp(freshPrince).things();

  // let m = nlp('the trip to Paris. it is paris france.');
  console.time('parse');
  let m = nlp('spencer kelly and dr. spencer kelly');
  console.timeEnd('parse');
  // m.people().unique().check();
  // m.places().unique().check();
  // m.check();
  // console.log(m.root());
  console.time('match');
  console.log(m.match('#Person').normal());
  console.timeEnd('match');

}, 1000);
