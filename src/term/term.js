'use strict';
const set_tag = require('./tag').set_tag;
const methods = require('./methods');
const normalize = require('./normalize');
const fns = require('../fns');
const build_whitespace = require('./whitespace');
// console.log(methods);

class Term {
  constructor(str, context) {
    this.text = fns.ensureString(str);
    this.context = fns.ensureObject(context);
    this.pos = {};
    this.whitespace = build_whitespace(this.text);
    this.text = this.text.trim();
    this.normal = normalize(this.text);
    this.silent_term = '';
  }

  remove() {
    let s = this.context.sentence;
    let index = this.info('index');
    s._terms.splice(index, 1);
    return s;
  }

  /** queries about this term with true or false answer */
  is(str) {
    if (this.pos[str]) {
      return true;
    }
    str = str.toLowerCase();
    if (methods.is[str]) {
      return methods.is[str](this);
    }
    return false;
  }

  /** fetch ad-hoc information about this term */
  info(str) {
    str = str.toLowerCase();
    if (methods.info[str]) {
      return methods.info[str](this);
    } else {
      console.log('missing method ' + str);
    }
    return null;
  }

  /** methods that change this term */
  to(str) {
    str = str.toLowerCase();
    if (methods.transform[str]) {
      return methods.transform[str](this);
    } else {
      console.log('missing method ' + str);
    }
    return null;
  }

  /** set the term as this part-of-speech */
  tag(tag) {
    this.pos[tag] = true;
    set_tag(this, tag, '');
  }

  /** get a list of words to the left of this one, in reversed order */
  before(n) {
    let terms = this.context.sentence.terms;
    //get terms before this
    let index = this.info('index');
    terms = terms.slice(0, index);
    //reverse them
    let reversed = [];
    var len = terms.length;
    for (let i = (len - 1); i !== 0; i--) {
      reversed.push(terms[i]);
    }
    let end = terms.length;
    if (n) {
      end = n;
    }
    return reversed.slice(0, end);
  }

  /** get a list of words to the right of this one */
  next(n) {
    let terms = this.context.sentence.terms;
    let i = this.info('index');
    let end = terms.length - 1;
    if (n) {
      end = n;
    }
    return terms.slice(i, end);
  }

}
module.exports = Term;
