'use strict';
//supported Sentence.to() methods
module.exports = {
  normal: (s) => {
    s.terms = s.terms.map((t) => {
      return t.to('normal');
    });
    return s;
  },

  exclamation: (s) => {
    s.terminator = '!';
    return s;
  },

  statement: (s) => {
    s.terminator = '.';
    return s;
  }
};
