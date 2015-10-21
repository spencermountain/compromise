'use strict';
//recieves a verb object, and returns a negated string
//sort out don't/didn't/doesn't/won't
const negate = function(v) {

  let exceptions = {
    'is': 'isn\'t',
    'are': 'aren\'t',
    'was': 'wasn\'t',
    'will': 'won\'t',
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
    words[0] = exceptions[words[0]];
    return words.join(' ');
  }
  //walked -> didn't walk
  if (v.form() === 'past') {
    return 'didn\'t ' + v.conjugate()['infinitive'];
  }
  //walks -> doesn't walk
  if (v.form() === 'present') {
    return 'doesn\'t ' + v.conjugate()['infinitive'];
  }
  //walking -> not walking
  if (v.form() === 'gerund') {
    return 'not ' + v.text;
  }
  //walker -> non-walker ?
  if (v.form() === 'doer') {
    return 'non-' + v.text;
  }
  //walk -> not walk ?
  if (v.form() === 'infinitive') {
    return 'not ' + v.text;
  }

  return v.text;

};

module.exports = negate;
