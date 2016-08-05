'use strict';
const Term = require('../term/term');
const split_terms = require('./split_terms');
const helpers = require('./helpers');
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
    this._terminator = helpers.strip_terminator(this);

    this.role = {};
    if (input.match(/\?/)) {
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
    return this.terms.reduce((str, t) => {
      str += ' ' + t.text;
      return str;
    }, '');
  }
}
module.exports = Sentence;
