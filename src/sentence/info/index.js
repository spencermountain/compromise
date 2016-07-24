'use strict';
//supported Sentence.get() methods
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
  }
};
