'use strict';
//supported Sentence.return() methods
module.exports = {
  text: (t) => {
    return t.sentences.reduce((str, s) => {
      str += s.as('text');
      return str;
    }, '');
  },
  normal: (t) => {
    return t.sentences.reduce((str, s) => {
      str += s.as('normal') + ' ';
      return str;
    }, '');
  }
};
