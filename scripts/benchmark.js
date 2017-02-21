'use strict';
const chalk = require('chalk');

setTimeout(() => {

  console.log(chalk.blue('\n\n==Warm-up, lexicon, etc=='));
  console.time('pre');
  const nlp = require('../src/index');
  // const nlp = require('../builds/compromise.js');

  console.timeEnd('pre');
  console.log(chalk.cyan('\n\n==One sentence=='));
  console.time('parse');
  nlp('spencer kelly and dr. spencer kelly');
  console.timeEnd('parse');

  // console.time('match');
  // m.match('#Person').normal();
  // console.timeEnd('match');

  (() => {
    const corpus = require('nlp-corpus');
    let str = corpus.poe.parsed()[5];

    console.log(chalk.green('\n\n==Long text=='));
    console.time('parseBig');
    let m = nlp(str);
    console.timeEnd('parseBig');

    console.time('matchBig');
    m.match('#Person').normal();
    console.timeEnd('matchBig');
    console.log('\n\n\n');
  })();

}, 200);
