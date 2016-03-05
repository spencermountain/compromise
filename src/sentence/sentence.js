'use strict';
const Term = require('../term/term.js');
const tagger = require('./pos/tagger.js');
const passive_voice = require('./passive_voice.js');
const negate = require('./negate.js');
const contract = require('./pos/contractions.js').contract;
const change_tense = require('./tense.js');
const match = require('../match/match.js');

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
    this.terms = tagger(this, options);
    //contractions
    this.contractions = {
      // "he'd go" -> "he would go"
      expand: function() {
        //the hard part is already done, just flip them
        the.terms.forEach(function(t) {
          if (t.implicit) {
            t.changeTo(t.implicit);
            t.implicit = '';
          }
        });
        return the;
      },
      // "he would go" -> "he'd go"
      contract: function() {
        return contract(the.terms);
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
        if (s === '') {
          s = t.text;
        } else {
          s += ' ' + t.text;
        }
      }
      return s;
    }, '');
  }
  //like text but for cleaner text
  normalized() {
    return this.terms.reduce(function(s, t) {
      if (t.text) {
        s += ' ' + t.normal;
      }
      return s;
    }, '');
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

// let s = new Sentence('the dog played');
// console.log(s.replace('the [Noun]', 'the cat').text());
