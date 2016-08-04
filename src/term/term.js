'use strict';
const set_tag = require('./tag').set_tag;
const methods = require('./methods');
const build_whitespace = require('./whitespace');
// console.log(methods);

class Term {
  constructor(str) {
    this.text = str;
    this.pos = {};
    this.whitespace = build_whitespace(this.text);
    this.text = this.text.trim();
    this.normal = this.text.toLowerCase().trim();
    this.silent_term = '';
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
    set_tag(this, tag, '');
  }

  /** get a list of words to the left of this one, in reversed order */
  before(n) {
    let terms = this.context.sentence.terms;
    //get terms before this
    let index = this.index();
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
    let i = this.index();
    let end = terms.length - 1;
    if (n) {
      end = n;
    }
    return terms.slice(i, end);
  }


  /** where in the sentence is it? zero-based. */
  index() {
    let terms = this.context.sentence.terms;
    for (let i = 0; i < terms.length; i++) {
      if (terms[i] === t) {
        return i;
      }
    }
    return null;
  }

}
module.exports = Term;
