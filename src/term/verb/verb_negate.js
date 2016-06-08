'use strict';
//recieves a verb object, and returns a negated string
//sort out don't/didn't/doesn't/won't
const fns = require('../../fns');

// logic:
// [past tense] - "sold" -> "didn't sell"
// [present] - "sells" -> "doesn't sell"
// [future] - "will sell" -> "won't sell"

const negate = function(v) {

  let known_negation = {
    'is': 'isn\'t',
    'are': 'aren\'t',
    'was': 'wasn\'t',
    'will': 'won\'t',
    'had': 'hadn\'t',
    //modals
    'did': 'didn\'t',
    'would': 'wouldn\'t',
    'could': 'couldn\'t',
    'should': 'shouldn\'t',
    'can': 'can\'t',
    'must': 'mustn\'t',
    'have': 'haven\'t',
    'has': 'hasn\'t',
    'does': 'doesn\'t',
    'do': 'don\'t',
  };
  //hard-coded explicit forms
  if (known_negation[v.normal]) {
    return known_negation[v.normal];
  }
  //try to un-negate?  create corrollary
  let known_affirmation = fns.reverseObj(known_negation);
  if (known_affirmation[v.normal]) {
    return known_affirmation[v.normal];
  }

  //multiple-word verbs, like 'have walked'
  let words = v.normal.split(' ');
  if (words.length > 1 && words[1] === 'not') {
    return words[0];
  }
  if (words.length > 1 && known_negation[words[0]]) {
    return known_negation[words[0]] + ' ' + words.slice(1, words.length).join(' ');
  }
  let form = v.conjugation();
  //walked -> didn't walk
  if (form === 'PastTense') {
    return 'didn\'t ' + v.conjugate()['infinitive'];
  }
  //walks -> doesn't walk
  if (form === 'PresentTense') {
    return 'doesn\'t ' + v.conjugate()['infinitive'];
  }
  //walking -> not walking
  if (form === 'Gerund') {
    return 'not ' + v.text;
  }
  //walker -> non-walker ?
  if (form === 'Actor') {
    return 'non-' + v.text;
  }
  //walk -> don't walk ?
  if (form === 'Infinitive') {
    return 'don\'t ' + v.text;
  }

  return v.text;

};

module.exports = negate;
