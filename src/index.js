'use strict';

const Result = require('./result');

const nlp = function (str, context) {
  return Result.fromString(str, context);
};

module.exports = nlp;
