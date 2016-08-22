'use strict';

const steps = {
  split_sentences: require('./01-split_sentences'),
  split_terms: require('./02-split_terms'),
  tagger: require('./03-tagger')
};
const Term = require('../models/term');
const TermList = require('../models/termList');
const fns = require('../fns');

//turn the string into an array of termList objects
const tokenize = (str, context) => {
  str = fns.ensureString(str);
  context = fns.ensureObject(context);
  return steps.split_sentences(str).map((sen) => {
    let terms = steps.split_terms(sen);
    terms = terms.map((term) => {
      let c = fns.copy(context);
      return new Term(term, c);
    });
    terms = new TermList(terms, this.context);
    //give it parent reference
    terms.forEach((t) => {
      t.context.sentence = terms;
    });
    terms = steps.tagger(terms);
    return terms;
  });
};
module.exports = tokenize;
