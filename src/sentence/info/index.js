'use strict';
//supported Sentence.get() methods
const mainVerb = (s) => {
  for (let i = 0; i < s.terms.length; i++) {
    if (s.terms[i].pos.Verb) {
      return s.terms[i]
    }
  }
  return null
}

module.exports = {

  sentencetype: (s) => {
    let terminator = s.terminator || '';
    //grab only the first character (eg. "!!!")
    terminator = terminator.substr(0, 1);
    const mapping = {
      '.': 'Declarative',
      '!': 'Exclamation',
      '?': 'Question'
    };
    if (mapping[terminator]) {
      return mapping[terminator];
    }
    return 'Declarative';
  },

  conjugation: (s) => {
    let verb = mainVerb(s)
    if (verb) {
      return verb.info('conjugation')
    }
    return null
  },

  tense: (s) => {
    let verb = mainVerb(s)
    if (verb) {
      return verb.info('tense')
    }
    return null
  }
};
