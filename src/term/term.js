'use strict';
//a Text() is a list of sentences, which are a list of Terms
const fns = require('../fns');
const get = require('./get/get');
const transform = require('./transform/transform');
const render = require('./render/render');
const normalize = require('./transform/normalize');

class Term {
  constructor(str, context) {
    this.text = fns.ensureString(str);
    this.context = fns.ensureObject(context);
    this.whitespace = fns.ensureObject(this.context.whitespace);
    this.whitespace.before = fns.ensureString(this.whitespace.before);
    this.whitespace.after = fns.ensureString(this.whitespace.after);
    this.normal = normalize(this.text);
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
    //is it known?
    if (is[method]) {
      return is[method](this);
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
module.exports = Term;
