'use strict';
const Term = require('../term/term');
const tagger = require('./pos/tagger');
const passive_voice = require('./passive_voice');
const negate = require('./negate');
const contractions = {
  interpret: require('./contractions/interpret'),
  contract: require('./contractions/contract'),
  expand: require('./contractions/expand'),
};
const change_tense = require('./tense');
const match = require('../match/match');

//a sentence is an array of Term objects, along with their various methods
class Sentence {

  constructor(str, options) {
    this.str = str || '';
    options = options || {};
    const the = this;
    const terms = str.split(' ');
    //build-up term-objects
    this.terms = terms.map(function(s) {
      return new Term(s);
    });
    //part-of-speech tagging
    this.terms = tagger(this, options);
    // process contractions
    this.terms = contractions.interpret(this.terms);
    //now the hard part is already done, just flip them
    this.contractions = {
      // "he'd go" -> "he would go"
      expand: function() {
        the.terms = contractions.expand(the.terms);
        return the;
      },
      // "he would go" -> "he'd go"
      contract: function() {
        the.terms = contractions.contract(the.terms);
        return the;
      }
    };
  }

  //Sentence methods:

  //insert a new word at this point
  addBefore(i, str) {
    let t = new Term(str);
    this.terms.splice(i, 0, t);
  }
  addAfter(i, str) {
    let t = new Term(str);
    this.terms.splice(i + 1, 0, t);
  }

  // a regex-like lookup for a list of terms.
  // returns [] of matches in a 'Terms' class
  match(match_str, options) {
    return match.findAll(this.terms, match_str, options);
  }
  //returns a transformed sentence
  replace(str, replacement, options) {
    match.replaceAll(this.terms, str, replacement, options);
    return this;
  }

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
      '.': 'declarative'
    };
    return types[char] || 'declarative';
  }

  // A was verbed by B - B verbed A
  is_passive() {
    return passive_voice(this);
  }
  // A is B - A is not B
  negate() {
    negate(this);
    return this;
  }

  //map over Term methods
  text() {
    return this.terms.reduce(function(s, t) {
      //implicit contractions shouldn't be included
      if (t.text) {
        s += ' ' + t.text;
      }
      return s;
    }, '').trim();
  }
  //like text but for cleaner text
  normalized() {
    return this.terms.reduce(function(s, t) {
      if (t.normal) {
        s += ' ' + t.normal;
      }
      return s;
    }, '').trim();
  }

  //further 'lemmatisation/inflection'
  root() {
    return this.terms.reduce(function(s, t) {
      s += ' ' + t.root;
      return s;
    }, '').trim();
  }
  //return only the main POS classnames/tags
  tags() {
    return this.terms.map(function(t) {
      return t.tag || '?';
    });
  }
  //mining for specific things
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
  organizations() {
    return this.terms.filter(function(t) {
      return t.pos['Organization'];
    });
  }
  values() {
    return this.terms.filter(function(t) {
      return t.pos['Value'];
    });
  }

  // john walks quickly -> john walked quickly
  to_past() {
    change_tense(this, 'past');
    return this;
  }
  // john walked quickly -> john walks quickly
  to_present() {
    change_tense(this, 'present');
    return this;
  }
  // john walked quickly -> john will walk quickly
  to_future() {
    change_tense(this, 'future');
    return this;
  }

}

Sentence.fn = Sentence.prototype;

module.exports = Sentence;

// let s = new Sentence(`don't go`);
// console.log(s.text());
// s.contractions.expand();
// console.log(s.text());
// s.contractions.contract();
// console.log(s.text());
