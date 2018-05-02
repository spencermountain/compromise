'use strict';
const fns = require('./paths').fns;
const build_whitespace = require('./whitespace');
const makeUID = require('./makeUID');
//normalization
const addNormal = require('./methods/normalize/normalize').addNormal;
const addRoot = require('./methods/normalize/root');

const Term = function(str, world) {
  this.tags = {};
  this._text = fns.ensureString(str);

  // this.world = world;
  Object.defineProperty(this, 'world', {
    enumerable: false, // hide it from for..in
    value: world
  });
  // this.world = function() {
  //   return world;
  // };
  //seperate whitespace from the text
  let parsed = build_whitespace(this._text);
  this.whitespace = parsed.whitespace;
  this._text = parsed.text;
  this.parent = null;
  this.silent_term = '';
  this.lumped = false;
  //normalize the _text
  addNormal(this);
  addRoot(this);
  //has this term been modified
  this.dirty = false;
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

/**run each time a new text is set */
Term.prototype.normalize = function() {
  addNormal(this);
  addRoot(this);
  return this;
};
/** where in the sentence is it? zero-based. */
Term.prototype.index = function() {
  let ts = this.parentTerms;
  if (!ts) {
    return null;
  }
  return ts.terms.indexOf(this);
};
/** make a copy with no originals to the original  */
Term.prototype.clone = function() {
  let term = new Term(this._text, this.world);
  term.tags = fns.copy(this.tags);
  term.whitespace = fns.copy(this.whitespace);
  term.silent_term = this.silent_term;
  return term;
};

require('./methods/misc')(Term);
require('./methods/out')(Term);
require('./methods/tag')(Term);
require('./methods/case')(Term);
require('./methods/punctuation')(Term);

module.exports = Term;
