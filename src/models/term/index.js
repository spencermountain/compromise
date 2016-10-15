'use strict';
const set_tag = require('./tag').set_tag;
const addNormal = require('./normalize');
const addRoot = require('./root');
const fns = require('../../fns');
const build_whitespace = require('./whitespace');
const methods = require('./methods');

const render = require('./render');

class Term {
  constructor(str, context) {
    this._text = fns.ensureString(str);
    this.context = fns.ensureObject(context);
    this.tag = {};
    this.sel = true;
    this.whitespace = build_whitespace(str || '');
    this._text = this._text.trim();

    Object.keys(methods).forEach((fn) => {
      this[fn] = {};
      Object.keys(methods[fn]).forEach((k) => {
        this[fn][k] = methods[fn][k].bind(this);
      });
    });

    this.normalize();
    this.silent_term = '';
    this.helpers = require('./helpers');

  }

  set text(str) {
    str = str || '';
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
    let index = this.term.index();
    s.arr.splice(index, 1);
    return s;
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

  /** replace this word with a new one*/
  replace(str) {
    let c = fns.copy(this.context);
    let term = new Term(str, c);
    term.whitespace.before = this.whitespace.before;
    term.whitespace.after = this.whitespace.after;
    term.endPunct = this.endPunct;
    let index = this.term.index();
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
    term.sel = this.sel;
    return term;
  }
}
Term.prototype.render = render;
module.exports = Term;
