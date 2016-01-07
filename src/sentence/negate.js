'use strict';
const fns = require('../fns.js');
const pos = require('./pos/parts_of_speech.js');
//negate makes s sentence mean s opposite thing.
const negate = function(s) {
  if (!s) {
    return '';
  }
  //these are cheap ways to negate s meaning
  // ('none' is ambiguous because it could mean (all or some) )
  const logic_negate = {
    //some logical ones work
    'everyone': 'no one',
    'everybody': 'nobody',
    'someone': 'no one',
    'somebody': 'nobody',
    // everything:"nothing",
    'always': 'never',
    //copulas
    'is': 'isn\'t',
    'are': 'aren\'t',
    'was': 'wasn\'t',
    'will': 'won\'t',
    //modals
    'didn\'t': 'did',
    'wouldn\'t': 'would',
    'couldn\'t': 'could',
    'shouldn\'t': 'should',
    'can\'t': 'can',
    'won\'t': 'will',
    'mustn\'t': 'must',
    'shan\'t': 'shall',
    'shant': 'shall',

    'did': 'didn\'t',
    'would': 'wouldn\'t',
    'could': 'couldn\'t',
    'should': 'shouldn\'t',
    'can': 'can\'t',
    'must': 'mustn\'t'
  };
  //loop through each term..
  for (let i = 0; i < s.terms.length; i++) {
    const tok = s.terms[i];
    // handle ambiguous contractions
    if (tok.reason === 'ambiguous_contraction') {
      tok.text = tok.normal;
    }

    //turn 'is' into 'isn't', etc - make sure 'is' isnt followed by a 'not', too
    if (logic_negate[tok.normal] && (!s.terms[i + 1] || s.terms[i + 1].normal !== 'not')) {
      tok.text = logic_negate[tok.normal];
      tok.normal = logic_negate[tok.normal];
      if (tok.capitalised) {
        tok.text = fns.titlecase(tok.text);
      }
      return s;
    }

    // find s first verb..
    if (tok instanceof pos.Verb) {
      // if verb is already negative, make it not negative
      if (tok.isNegative()) {
        if (s.terms[i + 1] && s.terms[i + 1].normal === 'not') {
          s.terms.splice(i + 1, 1);
        }
        return s;
      }

      //turn future-tense 'will go' into "won't go"
      if (tok.normal.match(/^will /i)) {
        tok.text = tok.text.replace(/^will /i, 'won\'t ');
        tok.normal = tok.text;
        if (tok.capitalised) {
          tok.text = fns.titlecase(tok.text);
        }
        return s;
      }
      // - INFINITIVE-
      // 'i walk' -> "i don't walk"
      if (tok.pos['infinitive'] && tok.conjugation() !== 'future') {
        tok.text = 'don\'t ' + (tok.conjugate().infinitive || tok.text);
        tok.normal = tok.text.toLowerCase();
        return s;
      }
      // - GERUND-
      // if verb is gerund, 'walking' -> "not walking"
      if (tok.conjugation() === 'gerund') {
        tok.text = 'not ' + tok.text;
        tok.normal = tok.text.toLowerCase();
        return s;
      }
      // - PAST-
      // if verb is past-tense, 'he walked' -> "he did't walk"
      if (tok.tense === 'past') {
        tok.text = 'didn\'t ' + (tok.analysis.conjugate().infinitive || tok.text);
        tok.normal = tok.text.toLowerCase();
        return s;
      }
      // - PRESENT-
      // if verb is present-tense, 'he walks' -> "he doesn't walk"
      if (tok.conjugations.present) {
        tok.text = 'doesn\'t ' + (tok.conjugate().infinitive || tok.text);
        tok.normal = tok.text.toLowerCase();
        return s;
      }
      // - FUTURE-
      // if verb is future-tense, 'will go' -> won't go. easy-peasy
      if (tok.conjugations.future) {
        if (tok.normal === 'will') {
          tok.normal = 'won\'t';
          tok.text = 'won\'t';
        } else {
          tok.text = tok.text.replace(/^will /i, 'won\'t ');
          tok.normal = tok.normal.replace(/^will /i, 'won\'t ');
        }
        if (tok.capitalised) {
          tok.text = fns.titlecase(tok.text);
        }
        return s;
      }

      return s;
    }
  }

  return s;
};

module.exports = negate;
