'use strict';
//a Sentence() is a list of Terms
const fns = require('../fns');
const Term = require('../term/term');
const Terms = require('../terms/terms');
const split_terms = require('./split_terms');
const info = require('./info');
const transforms = require('./transforms');
const render = require('./render');
const helpers = require('./helpers');
const tagger = require('../tagger');

class Sentence {
  constructor(str, context) {
    this.input = fns.ensureString(str);
    this.context = fns.ensureObject(context);
    this.terms = split_terms(this.input);
    this.terms = this.terms.map((txt) => {
      let c = fns.copy(context);
      c.sentence = this; //give it a ref
      return new Term(txt, c);
    });
    //parse-out terminating character
    this.terminator = helpers.strip_terminator(this);
    //do Part-of-Speech tagging
    tagger(this);
  }
  set text(str) {
    this.input = fns.ensureString(str);
    this.terminator = helpers.strip_terminator(this);
    tagger(this);
  }
  get text() {
    return fns.ensureString(this.input);
  }

  /** return a subset of flatten terms with the condition */
  if(str) {
    let terms = this.terms.filter((t) => t.is(str))
    return new Terms(terms)
  }

  /** add a word at a specific location */
  addWord(str, i, tag) {
    let t = new Term(str);
    if (tag) {
      t.tag(tag, 'add-word');
    }
    let before = this.terms.slice(0, i + 1);
    let after = this.terms.slice(i + 1, this.terms.length);
    this.terms = before.concat([t], after);
  }

  /** change the text, return this */
  to(method) {
    if (fns.isFunction(method)) {
      return method(this);
    }
    //is it a known transformation?
    method = method.toLowerCase();
    if (transforms[method]) {
      return transforms[method](this);
    }
    //else, apply it to each term
    this.terms = this.terms.map((t) => {
      return t.to(method);
    });
    return this;
  }

  /** get, analyze, return boolean */
  is(method) {
    if (fns.isFunction(method)) {
      return method(this);
    }
    return false;
  }

  /** get some data back */
  info(method) {
    if (fns.isFunction(method)) {
      return method(this);
    }
    //is it known?
    method = method.toLowerCase();
    if (info[method]) {
      return info[method](this);
    }
    //otherwise, try each term
    return this.terms.map((t) => {
      return t.info(method);
    });
  }

  /** return it as something */
  render(method) {
    if (fns.isFunction(method)) {
      return method(this);
    }
    //is it known?
    method = method.toLowerCase();
    if (render[method]) {
      return render[method](this);
    }
    //otherwise, try each term
    return this.terms.map((t) => {
      return t.render(method);
    });
  }
}
module.exports = Sentence;
