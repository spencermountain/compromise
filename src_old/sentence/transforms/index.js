'use strict';
//supported Sentence.to() methods
module.exports = {

  /** normalize punctuation, trim whitespace, lowercase */
  normal: (s) => {
    s.terms = s.terms.map((t) => {
      return t.to('normal');
    });
    return s;
  },

  /** turn the sentence into an Exclamation*/
  exclamation: (s) => {
    s.terminator = '!';
    return s;
  },
  /** turn the sentence into an Statement*/
  statement: (s) => {
    s.terminator = '.';
    return s;
  },
  /** turn the sentence into a Question*/
  question: (s) => {
    s.terminator = '?'; //TODO actually try this
    return s;
  }

};
