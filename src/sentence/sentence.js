'use strict';
const Term = require('../term/term.js');
const fns = require('../fns.js');
const tagger = require('./pos/tagger.js');
const pos = require('./pos/pos.js');

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

  to_past() {
    this.terms.forEach(function(t) {
      if (t instanceof pos.Verb) {
        t.to_past();
      }
    });
  }
  to_present() {
    this.terms.forEach(function(t) {
      if (t instanceof pos.Verb) {
        t.to_present();
      }
    });
  }
  to_future() {
    this.terms.forEach(function(t) {
      if (t instanceof pos.Verb) {
        t.to_future();
      }
    });
  }

  //map over Term methods
  normalized() {
    return fns.pluck(this.terms, 'normal').join(' ');
  }
  text() {
    return fns.pluck(this.terms, 'text').join(' ');
  }
  tags() {
    return fns.pluck(this.terms, 'tag');
  }
  //mining
  people() {
    return this.terms.filter(function(t) {
      return t.pos['Person'];
    });
  }
  places() {
    return this.terms.filter(function(t) {
      return t.pos['Place'];
    });
  }
  dates() {
    return this.terms.filter(function(t) {
      return t.pos['Date'];
    });
  }
  organisations() {
    return this.terms.filter(function(t) {
      return t.pos['Organisation'];
    });
  }
  values() {
    return this.terms.filter(function(t) {
      return t.pos['Value'];
    });
  }
}

module.exports = Sentence;
