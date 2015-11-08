'use strict';
//recieves a verb object, and returns a negated string
//sort out don't/didn't/doesn't/won't
const negate = function(v, form) {

  let exceptions = {
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
    'have': 'hasn\'t',
    'does': 'doesn\'t',
    //un-negate?
    'didn\'t': 'did',
    'doesn\'t': 'does',
    'wouldn\'t': 'would',
    'couldn\'t': 'could',
    'shouldn\'t': 'should',
    'can\'t': 'can',
    'won\'t': 'will',
    'mustn\'t': 'must',
    'shan\'t': 'shall',
    'shant': 'shall',
    'not': '',
    'don\'t': '',
  };
  //hard-coded exceptions
  if (exceptions[v.normal]) {
    return exceptions[v.normal];
  }

  //multiple-word verbs, like 'have walked'
  let words = v.normal.split(' ');
  if (words.length > 1 && exceptions[words[0]]) {
    return exceptions[words[0]] + ' ' + words.slice(1, words.length).join(' ');
  }
  form = form || v.conjugation();
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
