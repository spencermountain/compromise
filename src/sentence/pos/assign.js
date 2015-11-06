'use strict';
const pos = require('./pos');
let Noun = pos.Noun;
let Verb = pos.Verb;
let Adjective = pos.Adjective;
let Adverb = pos.Adjective;
let Term = pos.Term;

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
  'CD': Noun,
  'NU': Noun,
  'DA': Noun,
  'VB': Verb,
  'VBD': Verb,
  'VBP': Verb,
  'VBG': Verb,
  'VBF': Verb,
  'VBN': Verb,
  'VBZ': Verb,
  'CP': Verb,
  'MD': Verb,
  'JJ': Adjective,
  'JJR': Adjective,
  'JJS': Adjective,
  'RB': Adverb,
  'RBR': Adverb,
  'RBS': Adverb,
  'Adjective': Adjective,
  'Verb': Verb,
  'Adverb': Adverb,
  'Noun': Noun,
  'Value': pos.Value,
  'Place': pos.Place,
  'Person': pos.Person,
  'Date': pos._Date,
};

//swap the Term object with a proper Pos class
const assign = function(t, tag, reason) {
  let P = mapping[tag] || Term;
  t = new P(t.text, tag);
  t.reason = reason;
  return t;
};

module.exports = assign;
