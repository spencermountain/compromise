'use strict';

const steps = {
  split_sentences: require('./01-split_sentences'),
  split_terms: require('./02-split_terms'),
  tagger: require('./03-tagger'),
  buildup: require('./04-buildup'),
  corrections: require('./05-corrections'),
  phrase: require('./06-phrases'),
};
const Term = require('../term');
const Terms = require('../terms');
const fns = require('../fns');
const log = require('../logger');
const path = 'parse';

//turn the string into an array of termList objects
const tokenize = (str, context) => {
  str = fns.ensureString(str);
  context = fns.ensureObject(context);
  //step #1
  let arr = steps.split_sentences(str);
  arr = arr.map((sen, i) => {
    //find the particular words
    //step #2
    let ts = steps.split_terms(sen);
    ts = ts.map((term) => {
      //make them proper Term objects
      let c = fns.copy(context);
      return new Term(term, c);
    });
    //make it 'Terms()' object
    ts = new Terms(ts, context);
    //give each term a parent reference
    ts.terms.forEach((t) => {
      t.context.parent = ts;
    });

    log.tell('=sentence' + i + '=', path);
    //step #3
    ts = steps.tagger(ts);
    log.tell('\n', path);
    return ts;
  });
  //wrap them up into a Result
  let result = steps.buildup(arr, context);
  //fix apparent mistakes in tagging
  result = steps.corrections(result);
  //tag NounPhrase, VerbPhrase
  result = steps.phrase(result);
  return result;
};
module.exports = tokenize;
