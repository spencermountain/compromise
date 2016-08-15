'use strict';

module.exports = {

  /** is the sentence a Declarative, an Exclamation, or a Question*/
  sentencetype: (s) => {
    let terminator = s.terminator || '';
    //grab only the first character (eg. "!!!")
    terminator = terminator.substr(0, 1);
    const mapping = {
      '.': 'Statement',
      '!': 'Exclamation',
      '?': 'Question'
    };
    if (mapping[terminator]) {
      return mapping[terminator];
    }
    return 'Statement';
  },

  /** find the main verb of the sentence*/
  verbPhrase: (s) => {
    for (let i = 0; i < s.terms.length; i++) {
      if (s.terms[i].pos.Verb) {
        return s.terms[i]
      }
    }
    return null
  },
  /** is the sentence in present, past or future tense */
  tense: (s) => {
    let verb = s.info('VerbPhrase')
    if (verb) {
      return verb.info('tense')
    }
    return null
  }
};
