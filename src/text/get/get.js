'use strict';
//supported Sentence.get() methods
module.exports = {
  sentenceType: () => {

  },
  terms: (t) => {
    let arr = []
    t.sentences.forEach((s) => {
      s.terms.forEach((term) => {
        arr.push(term)
      })
    })
    return arr
  }
};
