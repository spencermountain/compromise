'use strict';

const steps = {
  split_sentences: require('./01-split_sentences'),
  split_terms: require('./02-split_terms'),
  tagger: require('./03-tagger'),
  findResult: require('./04-result'),
};
const Term = require('../models/term');
const Terms = require('../models/terms');
const fns = require('../fns');
const log = require('../logger');
const path = 'parse';

//turn the string into an array of termList objects
const tokenize = (str, context) => {
  str = fns.ensureString(str);
  context = fns.ensureObject(context);
  let arr = steps.split_sentences(str).map((sen, i) => {
    let terms = steps.split_terms(sen);
    terms = terms.map((term) => {
      let c = fns.copy(context);
      return new Term(term, c);
    });
    terms = new Terms(terms, this.context);
    //give it parent reference
    terms.forEach((t) => {
      t.context.sentence = terms;
    });
    log.tell('=sentence' + i + '=', path);
    terms = steps.tagger(terms);
    log.tell('\n', path);
    return terms;
  });
  //is it an array of sentences, or what
  return steps.findResult(arr, context);
};
module.exports = tokenize;
