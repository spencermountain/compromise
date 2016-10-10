'use strict';
const set_tag = require('./tag').set_tag;
const addNormal = require('./normalize');
const addRoot = require('./root');
const fns = require('../../fns');
const build_whitespace = require('./whitespace');

const methods = require('./methods');
methods.render = require('./render');

class Term {
  constructor(str, context) {
    this._text = fns.ensureString(str);
    this.context = fns.ensureObject(context);
    this.tag = {};
    this.whitespace = build_whitespace(str || '');
    this._text = this._text.trim();
    // this.endPunct = this.endPunctuation();
    this.normalize();
    this.silent_term = '';
    this.helpers = require('./helpers');

    this.noun = {};
    const nounObj = require('./noun');
    Object.keys(nounObj).forEach((k) => {
      this.noun[k] = nounObj.toPlural.bind(this);
    });
  }

  set text(str) {
    this._text = str.trim();
    if (this._text !== str) {
      this.whitespace = build_whitespace(str);
    }
    this.normalize();
  }

  get text() {
    return this._text;
  }

  normalize() {
    addNormal(this);
    addRoot(this);
  }

  /** the comma, period ... punctuation that ends this sentence */
  endPunctuation() {
    let m = this._text.match(/([\.\?\!,;:])$/);
    if (m) {
      //remove it from end of text
      // this.text = this._text.substr(0, this._text.length - 1);
      return m[0];
    }
    return '';
  }

  /** print-out this text, as it was given */
  plaintext() {
    let str = this.whitespace.before + this._text + this.whitespace.after;
    return str;
  }

  /** delete this term from its sentence */
  remove() {
    let s = this.context.parent;
    let index = this.info('index');
    s.arr.splice(index, 1);
    return s;
  }

  /** queries about this term with true or false answer */
  is(str) {
    if (this.tag[str]) {
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
      // console.log('missing \'info\' method ' + str);
    }
    return null;
  }

  /** find other terms related to this */
  pluck(str) {
    str = str.toLowerCase();
    if (methods.pluck[str]) {
      return methods.pluck[str](this);
    } else {
      console.warn('missing \'pluck\' method ' + str);
    }
    return null;
  }

  /** methods that change this term */
  to(str) {
    str = str.toLowerCase();
    if (methods.transform[str]) {
      return methods.transform[str](this);
    } else {
      console.warn('missing \'to\' method ' + str);
    }
    return null;
  }

  /** methods that change this term */
  render(str) {
    str = str.toLowerCase();
    if (methods.render[str]) {
      return methods.render[str](this);
    } else {
      console.warn('missing \'render\' method ' + str);
    }
    return null;
  }

  /** set the term as this part-of-speech */
  tagAs(tag, reason) {
    set_tag(this, tag, reason);
  }

  /** get a list of words to the left of this one, in reversed order */
  before(n) {
    let terms = this.context.parent.arr;
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
  after(n) {
    let terms = this.context.parent.arr;
    let i = this.info('index') + 1;
    let end = terms.length - 1;
    if (n) {
      end = i + n;
    }
    return terms.slice(i, end);
  }
  next() {
    let terms = this.context.parent.arr;
    let i = this.info('index') + 1;
    return terms[i];
  }

  /** add a word before this one*/
  append(str) {
    let term = this.helpers.makeTerm(str, this);
    let index = this.info('Index');
    let s = this.context.parent;
    s.arr.splice(index, 0, term);
    return s;
  }
  /** add a new word after this one*/
  prepend(str) {
    let term = this.helpers.makeTerm(str, this);
    let index = this.info('Index');
    let s = this.context.parent;
    s.arr.splice(index + 1, 0, term);
    return s;
  }
  /** replace this word with a new one*/
  replace(str) {
    let c = fns.copy(this.context);
    let term = new Term(str, c);
    term.whitespace.before = this.whitespace.before;
    term.whitespace.after = this.whitespace.after;
    term.endPunct = this.endPunct;
    let index = this.info('Index');
    let s = this.context.parent;
    s.arr[index] = term;
    return s;
  }

  /** make a copy with no references to the original  */
  clone() {
    let c = fns.copy(this.context);
    let term = new Term(this._text, c);
    term.tag = fns.copy(this.tag);
    term.whitespace = fns.copy(this.whitespace);
    term.silent_term = this.silent_term;
    term.endPunct = this.endPunct;
    return term;
  }
}

// const fnsNoun = require('./noun');
// // Term.prototype.noun = {};
// Object.keys(fnsNoun).forEach((k)=>{
//
// })
// let k = 'toPlural';
// Term.prototype.noun.toPlural = fnsNoun.toPlural;

module.exports = Term;
