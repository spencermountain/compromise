'use strict';
//recieves a verb object, and returns a negated string
//sort out don't/didn't/doesn't/won't

// logic:
// [past tense] - "sold" -> "didn't sell"
// [present] - "sells" -> "doesn't sell"
// [future] - "will sell" -> "won't sell"

const negate = function(v) {

  let known_forms = {
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
    'does': 'doesn\'t',
  };
  //hard-coded explicit forms
  if (known_forms[v.normal]) {
    return known_forms[v.normal];
  }
  //try to un-negate?
  // let keys = Object.keys(known_forms);
  // for(let i = 0; i < keys.length; i++) {
  //   if (known_forms[keys[i]] === v.normal) {
  //     return keys[i];
  //   }
  // }


  //multiple-word verbs, like 'have walked'
  let words = v.normal.split(' ');
  if (words.length > 1 && known_forms[words[0]]) {
    return known_forms[words[0]] + ' ' + words.slice(1, words.length).join(' ');
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
  //walk -> not walk ?
  if (form === 'Infinitive') {
    return 'not ' + v.text;
  }

  return v.text;

};

module.exports = negate;
