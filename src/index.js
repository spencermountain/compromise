'use strict';

const Result = require('./models/result');
const parse = require('./parse');

const nlp = function(str, context) {
  let arr = parse(str, context);
  return new Result(arr, context);
};

module.exports = nlp;
