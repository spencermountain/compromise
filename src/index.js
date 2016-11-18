'use strict';

const Result = require('./result');
const pkg = require('../package.json');

const nlp = function (str, context) {
  return Result.fromString(str, context);
};
nlp.version = pkg.version;

module.exports = nlp;
