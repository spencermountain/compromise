'use strict';
let pos = require('../pos/parts_of_speech');
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


//puts a 'implicit term' in this sentence, at 'i'
const handle_simple = function(terms, i, particle) {
  //fixup current term
  terms[i].expansion = terms[i].text.replace(/'.*/, '');
  //make ghost-term
  let second_word = new pos.Verb('');
  second_word.expansion = particle;
  terms.splice(i + 1, 0, second_word);
  return terms;
};

// `n't` contractions
const handle_negate = function(terms, i) {
  //dont expand negated first term - "isn't x done?", "wouldn't x go?"
  const allowed_intros = {
    'don\'t': true,
    'mustn\'t': true
  };
  if (i === 0 && !allowed_intros[terms[i].normal]) {
    return terms;
  }
  //fixup current term
  terms[i].expansion = terms[i].text.replace(/n'.*/, '');
  //make ghost-term
  let second_word = new pos.Term('');
  second_word.expansion = 'not';
  terms.splice(i + 1, 0, second_word);
  return terms;
};

// `'s` contractions
const handle_copula = function(terms, i) {
  //fixup current term
  terms[i].expansion = terms[i].text.replace(/'s$/, '');
  //make ghost-term
  let second_word = new pos.Verb('');
  second_word.expansion = 'is';
  terms.splice(i + 1, 0, second_word);
  return terms;
};


//turn all contraction-forms into 'silent' tokens
const interpret = function(terms) {
  for(let i = 0; i < terms.length; i++) {
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
