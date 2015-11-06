'use strict';
const partsofSpeech = require('./pos');
let Noun = partsofSpeech.Noun;
let Verb = partsofSpeech.Verb;
let Adjective = partsofSpeech.Adjective;
let Adverb = partsofSpeech.Adjective;
let Term = partsofSpeech.Term;

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
  'DT': Term,
  'IN': Term,
  'CC': Term,

  'Term': Term,
  'Noun': Noun,
  'Adjective': Adjective,
  'Verb': Verb,
  'Adverb': Adverb,
  'Value': Noun,
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
