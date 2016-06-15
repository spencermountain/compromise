'use strict';
const assign = require('../assign');
// question-words are awkward,
// 'why',  //*
// 'where',
// 'when',
// 'what',
// 'who',
// 'whom',
// 'whose',
// 'which'

//differentiate pos for "who walked?" -vs- "he who walked"
// Pick up that book on the floor.
const is_pronoun = function(terms, x) {
  const determiners = {
    who: true,
    whom: true,
    whose: true,
    which: true
  };
  //if it starts a sentence, it's probably a question
  if (x === 0) {
    return false;
  }
  if (determiners[terms[x].normal]) {
    //if it comes after a Noun..
    if (terms[x - 1] && terms[x - 1].pos['Noun']) {
      //if next word is a verb
      if (terms[x + 1] && (terms[x + 1].pos['Verb'] || terms[x + 1].pos['Adverb'])) {
        return true;
      }
    }
  }
  return false;
};

const question_pass = function(terms) {
  for(let i = 0; i < terms.length; i++) {
    if (terms[i].pos.Question && is_pronoun(terms, i)) {
      terms[i] = assign(terms[i], 'Pronoun', 'question_is_pronoun');
    }
  }
  return terms;
};

module.exports = question_pass;
