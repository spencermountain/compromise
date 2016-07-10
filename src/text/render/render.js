'use strict';
//supported Sentence.return() methods
module.exports = {
  text: (t) => {
    return t.sentences.reduce((str, s) => {
      str += s.return('text')
      return str
    }, '')
  },
  normal: (t) => {

  }
}