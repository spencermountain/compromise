setTimeout(() => {

  console.time('pre');
  const nlp = require('../src/index');
  // const nlp = require('../builds/nlp_compromise.js');
  console.timeEnd('pre');
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
  m.match('#Person').normal();
  console.timeEnd('match');
  (() => {
    const corpus = require('nlp-corpus');
    let str = corpus.poe.parsed()[5];
    console.time('parseBig');
    let m = nlp(str);
    console.timeEnd('parseBig');

    console.time('matchBig');
    m.match('#Person').normal();
    console.timeEnd('matchBig');
  })();

}, 1000);
