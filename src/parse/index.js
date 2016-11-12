'use strict';

const steps = {
  split_sentences: require('./01-split_sentences'),
  buildup: require('./04-buildup'),
  corrections: require('./05-corrections'),
  phrase: require('./06-phrases'),
};
const Result = require('../result');
const Term = require('../term');
const Terms = require('../terms');
const fns = require('../fns');

//turn an array of terms into a Terms obj
const makeTerms = (arr) => {
  let ts = arr.map((term) => {
    return new Term(term);
  });
  //ok, make it 'Terms()' object
  ts = new Terms(ts);
  //give each term a parent reference
  ts.terms.forEach((t) => {
    t.context.parent = ts;
  });
  return ts
}

//turn an array of Terms into a Result
const makeResult = (list) => {
  let result = new Result(list);
  //setup the original parent references
  result.list.forEach((ts) => {
    ts.terms.forEach((t) => {
      t.parent = ts;
    });
    ts.parent = result;
  });
  return result
}

//turn the string into an array of termList objects
const tokenize = (str) => {
  str = fns.ensureString(str);
  //step #1 - sentences
  let sentenceArr = steps.split_sentences(str);
  let list = sentenceArr.map((sen) => {
    //step #2 - terms
    let termArr = Terms.tokenize(sen)
    let ts = makeTerms(termArr)
      //step #3 - tagger
    ts.tagger()
    return ts;
  });
  //wrap them up into a Result
  let result = makeResult(list)
    //fix apparent mistakes in tagging
  result = steps.corrections(result);
  //tag NounPhrase, VerbPhrase
  result = steps.phrase(result);
  return result;
};
module.exports = tokenize;
