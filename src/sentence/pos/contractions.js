//add a 'quiet' token for contractions so we can represent their grammar
//some contractions need detailed POS tense info, to resolve the is/was/has part
'use strict';
const pos = require('../../sentence/pos/pos.js');

const easy_contractions = {
  'i\'d': ['i', 'would'],
  'she\'d': ['she', 'would'],
  'he\'d': ['he', 'would'],
  'they\'d': ['they', 'would'],
  'we\'d': ['we', 'would'],
  'i\'ll': ['i', 'will'],
  'she\'ll': ['she', 'will'],
  'he\'ll': ['he', 'will'],
  'they\'ll': ['they', 'will'],
  'we\'ll': ['we', 'will'],
  'i\'ve': ['i', 'have'],
  'they\'ve': ['they', 'have'],
  'we\'ve': ['we', 'have'],
  'should\'ve': ['should', 'have'],
  'would\'ve': ['would', 'have'],
  'could\'ve': ['could', 'have'],
  'must\'ve': ['must', 'have'],
  'i\'m': ['i', 'am'],
  'we\'re': ['we', 'are'],
  'they\'re': ['they', 'are'],
  'cannot': ['can', 'not']
};
let ambiguous = {
  'he\'s': 'he',
  'she\'s': 'she',
  'it\'s': 'it',
  'who\'s': 'who',
  'what\'s': 'what',
  'where\'s': 'where',
  'when\'s': 'when',
  'why\'s': 'why',
  'how\'s': 'how'
};


//take remaining sentence after contraction and decide which verb fits best [is/was/has]
let chooseVerb = function(terms) {
  for(let i = 0; i < terms.length; i++) {
    //he's nice
    if (terms[i].pos['Adjective']) {
      return 'is';
    }
    //he's followed
    if (terms[i].tag === 'PastTense') {
      return 'has';
    }
    //he's following
    if (terms[i].tag === 'Gerund') {
      return 'is';
    }
  }
  return 'is';
};

const easy_ones = function(terms) {
  for (let i = 0; i < terms.length; i++) {
    const t = terms[i];
    if (easy_contractions[t.normal]) {
      let pronoun = easy_contractions[t.normal][0];
      let verb = easy_contractions[t.normal][1];
      let new_terms = [new pos.Term(pronoun), new pos.Verb(verb)];
      const fixup = [].concat(
        terms.slice(0, i),
        new_terms,
        terms.slice(i + 1, terms.length)
      );
      return easy_ones(fixup); //recursive
    }
  }
  return terms;
};

const hard_ones = function(terms) {
  for (let i = 0; i < terms.length; i++) {
    const t = terms[i];
    if (ambiguous[t.normal]) {
      let pronoun = ambiguous[t.normal];
      let verb = chooseVerb(terms.slice(i, terms.length)); //send the rest of the sentence over
      let new_terms = [new pos.Term(pronoun), new pos.Verb(verb)];
      const fixup = [].concat(
        terms.slice(0, i),
        new_terms,
        terms.slice(i + 1, terms.length)
      );
      return hard_ones(fixup); //recursive
    }
  }
  return terms;
};


module.exports = {
  easy_ones,
  hard_ones
};
