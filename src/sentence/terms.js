'use strict';

//a slice of term objects
class Terms {
  constructor(terms) {
    this.terms = terms;
  }
  //a regex-like lookup for a sentence.
  // returns an array of terms
  lookup(str) {
    return lookup(this.terms, str);
  }
  //a 1-1 replacement of strings
  replace(str) {
    let words = str.split(' ');
    for(let i = 0; i < terms.length; i++) {
      terms[i].changeTo(words[i] || '');
    }
  }
  text() {
    return this.terms.reduce((arr, t) => {
      arr.push(t.text);
      return arr;
    }, []).join(' ');
  }
  normal() {
    return this.terms.reduce((arr, t) => {
      arr.push(t.normal);
      return arr;
    }, []).join(' ');
  }
}
//a slice of term objects
module.exports = Terms;
