// d/l file from here:
// https://raw.githubusercontent.com/nlp-compromise/nlp_compromise/2e657cd4564fc25b5e271d008c1032610e586a33/test/perf_tests/pos_test/pennTreebank.js
const data = require('./pennTreebank').data;
const nlp = require('../../../src');

const softMapping = {
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

const worst = {};

let good = data.filter((o) => {
  let terms = nlp(o.text).terms();
  if (terms.length !== o.pos.length) {
    return false;
  }
  for(let i = 0; i < o.pos.length; i++) {
    let want = o.pos[i].pos;
    want = softMapping[want];
    let term = terms.list[i].terms[0];
    if (!term.tags[want]) {
      let key = term.normal; //+ ' - ' + want;
      worst[key] = worst[key] || 1;
      worst[key] += 1;
      // console.log(term.normal, want, Object.keys(term.tags));
      return false;
    }
  }
  return true;
});

let keys = Object.keys(worst);
keys = keys.sort((a, b) => {
  if (worst[a] > worst[b]) {
    return -1;
  }
  return 1;
});
keys.slice(0, 100).forEach((k) => {
  console.log(k, worst[k]);
});
// console.log(keys);
// good = good.map((o) => {
//   o.pos = o.pos.map((p) => p.pos);
//   o.pos = o.pos.join(', ');
//   return o;
// });
// console.log(JSON.stringify(good, null, 2));
