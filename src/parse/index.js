'use strict';

const steps = {
  split_sentences: require('./01-split_sentences'),
  corrections: require('./05-corrections'),
  phrase: require('./06-phrases'),
};
const Result = require('../result');
const fns = require('../fns');

//turn the string into an array of termList objects
const tokenize = (str) => {
  str = fns.ensureString(str);
  //wrap them up into a Result
  let result = Result.fromString(str)
    //fix apparent mistakes in tagging
  result = steps.corrections(result);
  //tag NounPhrase, VerbPhrase
  result = steps.phrase(result);
  return result;
};
module.exports = tokenize;
