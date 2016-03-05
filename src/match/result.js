'use strict';
const match = require('./match.js');

// a slice of term objects returned from .match()
// ideally changes that happen here happen in the original object
class Result {
  constructor(terms) {
    this.terms = terms;
    //a short-cut for testing a match result
    this.exists = false;
    if (this.terms.length > 0) {
      this.exists = true;
    }
  }
  //wha, this is possible eg. text.match().match()
  match(str, options) {
    return match(this.terms, str, options);
  }
  //a 1-1 replacement of strings
  replace(str, options) {
    let words = str.split(' ');
    for(let i = 0; i < this.terms.length; i++) {
      //   //umm, this is like a capture-group in regexp..
      if (words[i] === '$') {
        continue;
      }
      this.terms[i].changeTo(words[i] || '');
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
module.exports = Result;
