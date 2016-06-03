'use strict';
let pos = require('../../parts_of_speech');
//places a 'silent' term where a contraction, like "they're" exists

//the formulaic contraction types:
const supported = {
  'll': 'will',
  'd': 'would',
  've': 'have',
  're': 'are',
  'm': 'am' //this is not the safest way to support i'm
//these ones are a bit tricksier:
// 't': 'not',
// 's': 'is' //or was
};

const irregulars = {
  'dunno': ['do not', 'know'],
  'wanna': ['want', 'to'],
  'gonna': ['going', 'to'],
  'im': ['i', 'am'],
  'alot': ['a', 'lot'],

  'dont': ['do not'],
  'don\'t': ['do not'],
  'dun': ['do not'],

  'won\'t': ['will not'],
  'wont': ['will not'],

  'can\'t': ['can not'],
  'cannot': ['can not'],

  'aint': ['is not'], //or 'are'
  'ain\'t': ['is not'],
  'shan\'t': ['should not'],

  'where\'d': ['where', 'did'],
  'when\'d': ['when', 'did'],
  'how\'d': ['how', 'did'],
  'what\'d': ['what', 'did'],
  'brb': ['be', 'right', 'back'],
  'let\'s': ['let', 'us'],
};

// `n't` contractions - negate doesn't have a second term
const handle_negate = function(terms, i) {
  terms[i].expansion = terms[i].text.replace(/n'.*/, '');
  terms[i].expansion += ' not';
  return terms;
};

//puts a 'implicit term' in this sentence, at 'i'
const handle_simple = function(terms, i, particle) {
  terms[i].expansion = terms[i].text.replace(/'.*/, '');
  //make ghost-term
  let second_word = new pos.Verb('');
  second_word.expansion = particle;
  second_word.whitespace.trailing = terms[i].whitespace.trailing;
  terms[i].whitespace.trailing = ' ';
  terms.splice(i + 1, 0, second_word);
  return terms;
};

// expand manual contractions
const handle_irregulars = function(terms, x, arr) {
  terms[x].expansion = arr[0];
  for(let i = 1; i < arr.length; i++) {
    let t = new pos.Term('');
    t.whitespace.trailing = terms[x].whitespace.trailing; //move whitespace
    terms[x].whitespace.trailing = ' ';
    t.expansion = arr[i];
    terms.splice(x + i, 0, t);
  }
  return terms;
};

// `'s` contractions
const handle_copula = function(terms, i) {
  //fixup current term
  terms[i].expansion = terms[i].text.replace(/'s$/, '');
  //make ghost-term
  let second_word = new pos.Verb('');
  second_word.whitespace.trailing = terms[i].whitespace.trailing; //move whitespace
  terms[i].whitespace.trailing = ' ';
  second_word.expansion = 'is';
  terms.splice(i + 1, 0, second_word);
  return terms;
};


//turn all contraction-forms into 'silent' tokens
const interpret = function(terms) {
  for(let i = 0; i < terms.length; i++) {
    //known-forms
    if (irregulars[terms[i].normal]) {
      terms = handle_irregulars(terms, i, irregulars[terms[i].normal]);
      continue;
    }
    //words with an apostrophe
    if (terms[i].has_abbreviation()) {
      let split = terms[i].normal.split(/'/);
      let pre = split[0];
      let post = split[1];
      // eg "they've"
      if (supported[post]) {
        terms = handle_simple(terms, i, supported[post]);
        continue;
      }
      // eg "couldn't"
      if (post === 't' && pre.match(/n$/)) {
        terms = handle_negate(terms, i);
        continue;
      }
      //eg "spencer's" -if it's possessive, it's not a contraction.
      if (post === 's' && terms[i].pos['Possessive']) {
        continue;
      }
      // eg "spencer's"
      if (post === 's') {
        terms = handle_copula(terms, i);
        continue;
      }
    }
  }

  return terms;
};

module.exports = interpret;

// let t = new pos.Verb(`spencer's`);
// let terms = interpret([t]);
// console.log(terms);
