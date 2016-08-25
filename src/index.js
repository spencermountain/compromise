'use strict';

const parse = require('./parse');

const nlp = function(str, context) {
  return parse(str, context);
};

module.exports = nlp;
