'use strict';
const chalk = require('chalk');
const corpus = require('nlp-corpus');

setTimeout(() => {

  console.log(chalk.blue('\n\n==Warm-up, lexicon, etc=='));
  console.time('pre');
  const nlp = require('../src/index');
  // const nlp = require('../builds/compromise.js');
  console.timeEnd('pre');

  console.log(chalk.cyan('\n\n==One sentence=='));
  console.time('parse');
  var m = nlp('spencer kelly and dr. spencer kelly');
  console.timeEnd('parse');

  console.log('\n');
  console.time('match');
  m.match('#Person').out();
  console.timeEnd('match');

  (() => {
    let str = corpus.poe.parsed()[5];

    console.log(chalk.green('\n\n==Long text=='));
    console.time('parseBig');
    let m2 = nlp(str);
    console.timeEnd('parseBig');

    console.log('\n');
    console.time('matchBig');
    m2.match('#Person').out('normal');
    console.timeEnd('matchBig');
    console.log('\n\n\n');
  })();

}, 200);
