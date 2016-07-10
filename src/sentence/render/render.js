'use strict';
//supported Sentence.return() methods
module.exports = {
  text: (s) => {
    return s.terms.reduce((str, t) => {
      str += t.whitespace.before + t.text + t.whitespace.after
      return str
    }, '')
  }
}