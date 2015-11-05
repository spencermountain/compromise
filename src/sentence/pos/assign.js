'use strict';
const Term = require('../../term/term.js');
const Verb = require('../../term/verb/verb.js');
const Noun = require('../../term/noun/noun.js');
const Value = require('../../term/noun/value/value.js');
const Adverb = require('../../term/adverb/adverb.js');
const Adjective = require('../../term/adjective/adjective.js');

const mapping = {
  'NN': Noun,
  'NNA': Noun,
  'NNP': Noun,
  'NNO': Noun,
  'NNPA': Noun,
  'NNAB': Noun,
  'NNPS': Noun,
  'NNS': Noun,
  'NNG': Noun,
  'PP': Noun,
  'PRP': Noun,
  'VB': Verb,
  'VBD': Verb,
  'VBP': Verb,
  'VBG': Verb,
  'VBF': Verb,
  'VBN': Verb,
  'VBZ': Verb,
  'CP': Verb,
  'JJ': Adjective,
  'JJR': Adjective,
  'JJS': Adjective,
  'RB': Adverb,
  'RBR': Adverb,
  'RBS': Adverb,
  'CD': Value,
  'NU': Value,
  'DA': Value,
  'MD': Verb,
  'DT': Term,
  'IN': Term,
  'CC': Term,

  'Term': Term,
  'Noun': Noun,
  'Adjective': Adjective,
  'Verb': Verb,
  'Adverb': Adverb,
  'Value': Value,
};

//swap the Term object with a proper Pos class
const assign = function(t, pos, reason) {
  if (mapping[pos] !== undefined) {
    t = new mapping[pos](t.text, pos);
    t.reason = reason;
  }
  return t;
};

module.exports = assign;
