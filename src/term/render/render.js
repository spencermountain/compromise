'use strict';
//supported Sentence.return() methods
module.exports = {
  text: (t) => {
    return t.whitespace.before + t.text + t.whitespace.after;
  },
  normal: (t) => {
    return t.normal;
  }
};
