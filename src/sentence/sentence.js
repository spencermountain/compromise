'use strict';
//a Sentence() is a list of Terms
const fns = require('../fns');
const Term = require('../term/term');
const split_terms = require('./split_terms');
const get = require('./get/get');
const transform = require('./transform/transform');
const render = require('./render/render');
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
  //add a word at a specific location
  addWord(str, i, tag) {
    let t = new Term(str);
    if (tag) {
      t.tag(tag, 'add-word');
    }
    let before = this.terms.slice(0, i + 1);
    let after = this.terms.slice(i + 1, this.terms.length);
    this.terms = before.concat([t], after);
  }
  //change the text, return this
  to(method) {
    if (fns.isFunction(method)) {
      return method(this);
    }
    //is it known?
    if (transform[method]) {
      return transform[method](this);
    }
    return this;
  }

  //get, analyze, return boolean
  is(method) {
    if (fns.isFunction(method)) {
      return method(this);
    }
    return false;
  }

  //get some data back
  get(method) {
    if (fns.isFunction(method)) {
      return method(this);
    }
    //is it known?
    if (get[method]) {
      return get[method](this);
    }
    return null;
  }

  //return it as something
  as(method) {
    if (fns.isFunction(method)) {
      return method(this);
    }
    //is it known?
    if (render[method]) {
      return render[method](this);
    }
    return '';
  }
}
module.exports = Sentence;
