'use strict';
//a Sentence() is a list of Terms
const fns = require('../fns');
const Term = require('../term/term');
const split_terms = require('./split_terms');
const get = require('./get/get');
const transform = require('./transform/transform');
const render = require('./render/render');
const helpers = require('./helpers');
const tagger = require('./pos/tagger');

class Sentence {
  constructor(str, context) {
    this.input = fns.ensureString(str);
    this.context = context;
    this.terms = split_terms(this.input);
    this.terms = this.terms.map((o) => {
      let c = fns.copy(context);
      c.whitespace = {
        before: o.before || '',
        after: o.after || ''
      };
      c.sentence_ref = this; //give it a ref
      return new Term(o.text, c);
    });
    //parse-out terminating character
    this.terminator = helpers.strip_terminator(this);
    //do Part-of-Speech tagging
    tagger(this);
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
