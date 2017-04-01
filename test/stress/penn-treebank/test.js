const data = require('./pennTreebank').data;
const nlp = require('../../../src');


const mapping = {
  CC: 'Conjunction',
  CD: 'Cardinal',
  DT: 'Determiner',
  FW: 'Expression',
  IN: 'Preposition',
  JJ: 'Adjective',
  JJR: 'Comparative',
  JJS: 'Superlative',
  MD: 'Verb',
  NN: 'Noun',
  NNS: 'Noun',
  NNP: 'Noun',
  NNPS: 'Noun',
  POS: 'Possessive',
  PRP: 'Pronoun',
  'PRP$': 'Pronoun',
  RB: 'Adverb',
  RBR: 'Comparative',
  RBS: 'Superlative',
  // EX: 'Existential there',
  // PDT: 'Predeterminer',
  // RP: 'Particle',
  // SYM: 'Symbol',
  TO: 'Conjunction',
  UH: 'Expression',
  VB: 'Verb',
  VBD: 'Verb',
  VBG: 'Verb',
  VBN: 'Verb', // past participle
  VBP: 'Verb', // non-3rd person singular present
  VBZ: 'Verb', // 3rd person singular present
  WDT: 'Determiner',
  WP: 'Pronoun',
  'WP$': 'Noun',
  WRB: 'Adverb',
};

console.log(data[3]);
