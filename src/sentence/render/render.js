'use strict';
//supported Sentence.return() methods
module.exports = {
  text: (s) => {
    return s.terms.reduce((str, t) => {
      str += t.as('text');
      return str;
    }, '');
  },

  normal: (s) => {
    let normal = s.terms.reduce((str, t) => {
      str += ' ' + t.as('normal');
      return str;
    }, '');
    normal = normal.trim();
    //add terminator
    let form = s.get('sentenceType');
    const mapping = {
      'Exclamation': '!',
      'Declarative': '.',
      'Question': '?'
    };
    if (mapping[form]) {
      normal = normal += mapping[form];
    }
    return normal;
  }
};
