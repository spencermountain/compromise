'use strict';
const Term = require('../term/term');
const split_terms = require('./split_terms');
const fns = require('../fns');
const tagger = require('../tagger');

class Sentence {
  constructor(input, context) {
    this.context = fns.ensureObject(context);
    this._terms = split_terms(input);
    this._terms = this._terms.map((txt) => {
      let c = fns.copy(context);
      c.sentence = this; //give it a ref
      return new Term(txt, c);
    });
    //parse-out terminating character
    this._terminator = this._terms[this._terms.length - 1].endPunct || '';
    this.role = {};
    if (this._terminator === '?') {
      this.role.Question = true;
    } else {
      this.role.Statement = true;
    }
    //do Part-of-Speech tagging
    tagger(this);
  }

  is(str) {
    if (this.role[str]) {
      return true;
    }
    return false;
  }
  match() {
    return false;
  }

  text() {
    return this._terms.reduce((str, t) => {
      str += t.plaintext();
      return str;
    }, '');
  }
}
module.exports = Sentence;
