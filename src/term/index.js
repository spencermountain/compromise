'use strict';
const fns = require('./paths').fns;
const build_whitespace = require('./whitespace');
const makeUID = require('./makeUID');

const Term = function(str) {
  this._text = fns.ensureString(str);
  this.tags = {};
  //seperate whitespace from the text
  let parsed = build_whitespace(this._text);
  this.whitespace = parsed.whitespace;
  this._text = parsed.text;
  // console.log(this.whitespace, this._text);
  this.parent = null;
  this.silent_term = '';
  //has this term been modified
  this.dirty = false;
  this.normalize();
  //make a unique id for this term
  this.uid = makeUID(this.normal);

  //getters/setters
  Object.defineProperty(this, 'text', {
    get: function() {
      return this._text;
    },
    set: function(txt) {
      txt = txt || '';
      this._text = txt.trim();
      this.dirty = true;
      if (this._text !== txt) {
        this.whitespace = build_whitespace(txt);
      }
      this.normalize();
    }
  });
  //bit faster than .constructor.name or w/e
  Object.defineProperty(this, 'isA', {
    get: function() {
      return 'Term';
    }
  });
};


/** where in the sentence is it? zero-based. */
Term.prototype.index = function() {
  let ts = this.parentTerms;
  if (!ts) {
    return null;
  }
  return ts.terms.indexOf(this);
};
/** make a copy with no references to the original  */
Term.prototype.clone = function() {
  let term = new Term(this._text, null);
  term.tags = fns.copy(this.tags);
  term.whitespace = fns.copy(this.whitespace);
  term.silent_term = this.silent_term;
  return term;
};

require('./methods/normalize')(Term);
require('./methods/misc')(Term);
require('./methods/out')(Term);
require('./methods/tag')(Term);
require('./methods/case')(Term);
require('./methods/punctuation')(Term);

module.exports = Term;
