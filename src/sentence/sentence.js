'use strict';
const Term = require('../term/term');
const tagger = require('./pos/tagger');
const passive_voice = require('./passive_voice');
const contractions = {
  interpret: require('./contractions/interpret'),
  contract: require('./contractions/contract'),
  expand: require('./contractions/expand'),
};
const change_tense = require('./tense');
const spot = require('./spot');
const match = require('../match/match');

//a sentence is an array of Term objects, along with their various methods
class Sentence {

  constructor(str, options) {
    this.str = str || '';
    options = options || {};
    const the = this;
    const words = str.split(/( +)/);
    //build-up term-objects
    this.terms = [];
    if (words[0] === '') {
      words.shift();
    }
    for(let i = 0; i < words.length; i++) {
      if (!words[i] || !words[i].match(/\S/i)) {
        continue;
      }
      let whitespace = {
        preceding: words[i - 1],
        trailing: words[i + 1],
      };
      //don't use them twice
      words[i - 1] = null;
      words[i + 1] = null;
      this.terms.push(new Term(words[i], null, whitespace));
    }
    // console.log(this.terms);
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

  //tokenize the match string, just like you'd tokenize the sentence.
  //this avoids lumper/splitter problems between haystack and needle
  tokenize_match(str) {
    let regs = new Sentence(str).terms; //crazy!
    regs = regs.map((t) => t.text);
    regs = regs.filter((t) => t !== '');
    return regs;
  }

  // a regex-like lookup for a list of terms.
  // returns [] of matches in a 'Terms' class
  match(match_str, options) {
    let regs = this.tokenize_match(match_str);
    return match.findAll(this.terms, regs, options);
  }
  //returns a transformed sentence
  replace(match_str, replacement, options) {
    let regs = this.tokenize_match(match_str);
    replacement = this.tokenize_match(replacement);
    match.replaceAll(this.terms, regs, replacement, options);
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
  // Question doesn't have negate, this is a placeholder
  negate() {
    return this;
  }

  //map over Term methods
  text() {
    return this.terms.reduce(function(s, t) {
      //implicit contractions shouldn't be included
      if (t.text) {
        s += (t.whitespace.preceding || '') + t.text + (t.whitespace.trailing || '');
      }
      return s;
    }, '');
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
      s += ' ' + t.root();
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
  strip_conditions() {
    this.terms = this.terms.filter((t, i) => {
      //remove preceding condition
      if (i > 0 && t.pos['Condition'] && !this.terms[i - 1].pos['Condition']) {
        this.terms[i - 1].text = this.terms[i - 1].text.replace(/,$/, '');
        this.terms[i - 1].whitespace.trailing = '';
        this.terms[i - 1].rebuild();
      }
      return !t.pos['Condition'];
    });
    //
    return this;
  }

  //named-entity recognition
  topics() {
    return spot(this);
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
