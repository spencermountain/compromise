//add a 'quiet' token for contractions so we can represent their grammar
//some contractions need detailed POS tense info, to resolve the is/was/has part
'use strict';
const pos = require('../../sentence/pos/parts_of_speech.js');

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
let opposite_map = Object.keys(ambiguous).reduce(function(h, k) {
  h[ambiguous[k]] = k;
  return h;
}, {});

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
      //first one assumes the whole word, but has implicit first-half of contraction
      terms[i].implicit = easy_contractions[t.normal][0];
      //second one gets an empty term '', but has an implicit verb, like 'is'
      let word_two = new pos.Term('');
      word_two.implicit = easy_contractions[t.normal][1];
      terms.splice(i + 1, 0, word_two);
      i++;
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
      //first one assumes the whole word, but has implicit first-half of contraction
      terms[i].implicit = pronoun;
      //second one gets an empty term '', but has an implicit verb, like 'is'
      let word_two = new pos.Term('');
      word_two.implicit = verb;
      terms.splice(i + 1, 0, word_two);
      i++;
    }
  }
  return terms;
};

const combine_contraction = function(terms, i, k) {
  //combine two terms
  terms[i].implicit = terms[i].text;
  terms[i + 1].implicit = terms[i + 1].text;
  terms[i].text = k;
  terms[i].rebuild();
  //undo second term
  terms[i + 1].text = '';
  terms[i + 1].rebuild();
  return terms;
};

//turn 'i will' into "i'll"
const contract = function(terms) {
  for (let i = 0; i < terms.length - 1; i++) {
    const t = terms[i];
    Object.keys(easy_contractions).forEach(function(k) {
      let arr = easy_contractions[k];
      let next = terms[i + 1];
      if (terms[i].normal === arr[0] && next.normal === arr[1]) {
        terms = combine_contraction(terms, i, k);
        return;
      }
      //'hard ones'
      if (opposite_map[terms[i].normal] && (next.normal === 'is' || next.normal === 'was' || next.normal === 'has')) {
        terms = combine_contraction(terms, i, opposite_map[terms[i].normal]);
        return;
      }
    });
  }
  return terms;
};

module.exports = {
  easy_ones,
  hard_ones,
  contract
};
