//add a 'quiet' token for contractions so we can represent their grammar
//some contractions need detailed POS tense info, to resolve the is/was/has part
'use strict';
const pos = require('../../sentence/pos/parts_of_speech.js');

const irregulars = {
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

  'can\'t': ['can', 'not'],
  'ain\'t': ['is', 'not'],
  'won\'t': ['will', 'not']
};
let ambiguous = {
  'he\'s': 'he',
  'she\'s': 'she',
  'there\'s': 'there',
  'that\'s': 'that',
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

////
///// Expand Methods
///

//couldn't, shouldn't, wouldn't
const negative_contraction = function(str) {
  if (str.match(/..n't$/)) {
    return [str.replace(/n't$/, ''), 'not'];
  }
  return null;
};


const easy_ones = function(terms) {
  for (let i = 0; i < terms.length; i++) {
    const t = terms[i];
    //try the explicit ones
    let two_words = irregulars[t.normal];
    //try 'nt ones
    if (!two_words) {
      two_words = negative_contraction(t.normal);
    }
    if (two_words) {
      //first one assumes the whole word, but has implicit first-half of contraction
      terms[i].implicit = two_words[0];
      //second one gets an empty term '', but has an implicit verb, like 'is'
      let word_two = new pos.Term('');
      word_two.implicit = two_words[1];
      terms.splice(i + 1, 0, word_two);
      i++;
    }
  }
  return terms;
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


////
///// Contract Methods
///

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


const contract_irregulars = function(terms) {
  for (let i = 0; i < terms.length - 1; i++) {
    let t = terms[i];
    let next = terms[i + 1];
    //try irregulars
    let keys = Object.keys(irregulars);
    for(let o = 0; o < keys.length; o++) {
      let k = keys[o];
      let arr = irregulars[k];
      if (t.normal === arr[0] && next.normal === arr[1]) {
        terms = combine_contraction(terms, i, k);
        i += 1;
      }
    }

    //try ambiguous ones
    if (opposite_map[t.normal] && (next.normal === 'is' || next.normal === 'was' || next.normal === 'has')) {
      terms = combine_contraction(terms, i, opposite_map[t.normal]);
      i += 1;
    }
  }
  return terms;
};

const contract_negative = function(terms) {
  //verbs that aren't modals or copulas, but have n't contractions
  let contract_verbs = {
    can: true,
    do: true,
    did: true,
    have: true,
    were: true,
    was: true
  };
  for (let i = 0; i < terms.length - 1; i++) {
    let t = terms[i];
    let next = terms[i + 1];
    //try negative ones
    if (next.normal === 'not') {
      //a good candidate for a negative contraction
      if (contract_verbs[t.normal] || t.pos['Modal'] || t.pos['Copula']) {
        let shorter = t.normal + 'n\'t';
        terms = combine_contraction(terms, i, shorter);
        continue;
      }
    }
  }
  return terms;
};

//turn 'you will' to "you'll"
const contract_will = function(terms) {
  for (let i = 0; i < terms.length - 1; i++) {
    let t = terms[i];
    let next = terms[i + 1];
    //try negative ones
    if (next.normal === 'will') {
      //a good candidate for a negative contraction
      if (t.pos['Person'] || t.pos['Pronoun']) {
        let shorter = t.normal + '\'ll';
        terms = combine_contraction(terms, i, shorter);
        continue;
      }
    }

  }
  return terms;
};

//turn 'i will' into "i'll"
const contract = function(terms) {
  //to irregular versions
  terms = contract_irregulars(terms);
  //to systematic versions
  terms = contract_negative(terms);
  terms = contract_will(terms);
  return terms;
};

module.exports = {
  easy_ones,
  hard_ones,
  contract
};
