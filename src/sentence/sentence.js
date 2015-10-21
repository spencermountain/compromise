'use strict';
const Term = require('../term/term.js');
const fns = require('../fns.js');
const tagger = require('./pos/tagger.js');

//a sentence is an array of Term objects, along with their various methods
class Sentence {

  constructor(str) {
    this.str = str || '';
    const terms = str.split(' ');
    this.terms = terms.map(function(s, i) {
      const info = {
        index: i
      };
      return new Term(s, info);
    });
    this.terms = tagger(this);
  }

  //Sentence methods:

  //the ending punctuation
  terminator() {
    const allowed = ['.', '?', '!'];
    const punct = this.str.slice(-1) || '';
    if (allowed.indexOf(punct) !== -1) {
      return punct;
    }
    return '.';
  }

  //part-of-speech assign each term
  tag() {
    this.terms = tagger(this);
    return this.terms;
  }

  //is it a question/statement
  sentence_type() {
    const char = this.terminator();
    const types = {
      '?': 'interrogative',
      '!': 'exclamative',
      '.': 'declarative',
    };
    return types[char] || 'declarative';
  }

  //map over Term methods
  normalized() {
    return fns.pluck(this.terms, 'normal').join(' ');
  }
  text() {
    return fns.pluck(this.terms, 'text').join(' ');
  }
  parents() {
    return fns.pluck(this.terms, 'parent');
  }
}

module.exports = Sentence;
