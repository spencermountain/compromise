'use strict';
const Term = require('../term/term');
const split_terms = require('./split_terms');
const fns = require('../fns');
const tagger = require('../tagger');
const methods = require('./index');
const TermList = require('../termList/termList');

class Sentence {
  constructor(input, context) {
    //first, build-up the terms
    this.context = fns.ensureObject(context);
    this.arr = split_terms(input);
    this.arr = this.arr.map((txt) => {
      let c = fns.copy(context);
      c.sentence = this; //give it a ref
      return new Term(txt, c);
    });
    //do Part-of-Speech tagging
    tagger(this);
    //add render methods
    Object.keys(methods.render).forEach((k) => {
      this[k] = () => {
        methods.render[k](this);
      };
    });
  }
  /**parse-out terminating character */
  get terminator() {
    let t = this.pluck('last');
    if (t) {
      return t.endPunct || '';
    }
    return '';
  }
  /** actually change the last term */
  set terminator(c) {
    let t = this.pluck('last');
    if (t) {
      t.endPunct = c;
    }
  }

  terms() {
    return new TermList(this.arr);
  }

  /** queries about this sentence with true or false answer */
  is(str) {
    str = str.toLowerCase();
    if (methods.is[str]) {
      return methods.is[str](this);
    }
    return false;
  }

  /** fetch ad-hoc information about this sentence */
  info(str) {
    str = str.toLowerCase();
    if (methods.info[str]) {
      return methods.info[str](this);
    } else {
      console.log('missing \'info\' method ' + str);
    }
    return null;
  }

  /** find terms related to this sentence*/
  pluck(str) {
    str = str.toLowerCase();
    if (methods.pluck[str]) {
      return methods.pluck[str](this);
    } else {
      console.log('missing \'pluck\' method ' + str);
    }
    return null;
  }

  /** methods that transform this sentence */
  to(str) {
    str = str.toLowerCase();
    if (methods.transform[str]) {
      return methods.transform[str](this);
    } else {
      console.log('missing \'to\' method ' + str);
    }
    return null;
  }

  match() {
    return false;
  }

  text() {
    return this.arr.reduce((str, t) => {
      str += t.plaintext();
      return str;
    }, '');
  }
}
module.exports = Sentence;
