'use strict';
//supported Sentence.to() methods
module.exports = {
  normal: (s) => {
    s.terms = s.terms.map((t) => {
      return t.to('normal');
    });
    return s;
  },

  Exclamation: (s) => {
    s.terms[s.terms.length - 1].text += '!';
    return s;
  }
};
