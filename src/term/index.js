'use strict';
const setTag = require('./setTag');
const unTag = require('./unTag');
const addNormal = require('./normalize');
const addRoot = require('./root');
const fns = require('./paths').fns;
const build_whitespace = require('./whitespace');

const bindMethods = (o, str, self) => {
  self[str] = {};
  Object.keys(o).forEach((fn) => {
    self[str][fn] = o[fn].bind(self);
  });
};

class Term {
  constructor(str, context) {
    this._text = fns.ensureString(str);
    this.context = fns.ensureObject(context);
    this.tag = {};
    this.whitespace = build_whitespace(str || '');
    this._text = this._text.trim();
    this.parent = null;

    bindMethods(require('./term'), 'term', this);
    bindMethods(require('./verb'), 'verb', this);
    bindMethods(require('./noun'), 'noun', this);
    bindMethods(require('./adjective'), 'adjective', this);
    bindMethods(require('./adverb'), 'adverb', this);
    bindMethods(require('./value'), 'value', this);
    bindMethods(require('./pronoun'), 'pronoun', this);
    bindMethods(require('./render'), 'render', this);
    bindMethods(require('./month'), 'month', this);
    bindMethods(require('./copula'), 'copula', this);
    bindMethods(require('./weekday'), 'weekday', this);

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
  wut() {
    return 'Term'
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

  index() {
    let ts = this.parent;
    if (!ts) {
      return null;
    }
    return ts.terms.indexOf(this);
  }

  /** delete this term from its sentence */
  remove() {
    let ts = this.parent;
    if (!ts) {
      return null;
    }
    ts.terms.splice(this.index(), 1);
    return ts;
  }

  /** set the term as this part-of-speech */
  tagAs(tag, reason) {
      setTag(this, tag, reason);
    }
    /** remove this part-of-speech from the term*/
  unTag(tag, reason) {
    unTag(this, tag, reason);
  }

  /** make a copy with no references to the original  */
  clone() {
    let c = fns.copy(this.context);
    let term = new Term(this._text, c);
    term.tag = fns.copy(this.tag);
    term.whitespace = fns.copy(this.whitespace);
    term.silent_term = this.silent_term;
    return term;
  }
}
module.exports = Term;
