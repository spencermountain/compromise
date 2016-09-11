'use strict';

const steps = {
  split_sentences: require('./01-split_sentences'),
  split_terms: require('./02-split_terms'),
  tagger: require('./03-tagger')
};
const Term = require('../models/term');
const Terms = require('../models/result/terms');
const fns = require('../fns');
const log = require('../logger');
const path = 'parse';
const Result = require('../models/result');

//turn the string into an array of termList objects
const tokenize = (str, context) => {
  str = fns.ensureString(str);
  context = fns.ensureObject(context);
  //step #1
  let arr = steps.split_sentences(str);
  arr = arr.map((sen, i) => {
    //find the particular words
    //step #2
    let terms = steps.split_terms(sen);
    terms = terms.map((term) => {
      //make them proper Term objects
      let c = fns.copy(context);
      return new Term(term, c);
    });
    //make it 'Terms()' object
    terms = new Terms(terms, context);
    //give each term a parent reference
    terms.forEach((t) => {
      t.context.parent = terms;
    });
    log.tell('=sentence' + i + '=', path);
    //step #3
    terms = steps.tagger(terms);
    log.tell('\n', path);
    return terms;
  });
  //is it an array of sentences, or what
  return new Result(arr, context);
};
module.exports = tokenize;
