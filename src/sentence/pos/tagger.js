'use strict';
// const lexicon = require('../../lexicon/lexicon');
let logger = require('../../log')

const tagger = function(s) {
  let log = logger(s.context.debug)
  log('--tagging-- "' + s.input + '"')
  return s;
};

module.exports = tagger;
