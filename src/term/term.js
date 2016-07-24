'use strict';
//a Text() is a list of sentences, which are a list of Terms
const fns = require('../fns');
const log = require('../log');
const set_tag = require('./tag');
const tagset = require('../tagset');
const build_whitespace = require('./whitespace');
const render = require('./render');
const normalize = require('./transforms/term/normalize');

class Term {
  constructor(str, context) {
    this.str = fns.ensureString(str);
    this.context = fns.ensureObject(context);
    this.whitespace = build_whitespace(this.str);
    this.silent_term = '';
    this.text = this.str.trim();
    this.normal = normalize(this.text);
    this.pos = {};
    this.transforms = {};
    this.infos = {};
    this.tag('Term', 'constructor');
  }

  set text(str) {
    this.str = fns.ensureString(str);
    this.normal = normalize(this.text);
  }
  get text() {
    return fns.ensureString(this.str);
  }
  tag(tag, reason) {
    set_tag(this, tag, reason);
    return this;
  }
  //change the text, return this
  to(method) {
    if (fns.isFunction(method)) {
      return method(this);
    }
    //is it a known transformation?
    method = method.toLowerCase();
    if (this.transforms[method]) {
      return this.transforms[method](this);
    }
    //is it just a pos-tag?
    if (tagset[method]) {
      this.tag(method);
    }
    log.change('no method ' + method, 'term');
    return this;
  }

  //get some data back
  info(method) {
    if (fns.isFunction(method)) {
      return method(this);
    }
    method = method.toLowerCase();
    if (this.infos[method]) {
      return this.infos[method](this);
    }
    return null;
  }

  //get, analyze, return boolean
  is(method) {
    if (fns.isFunction(method)) {
      return method(this);
    }
    method = fns.titleCase(method);
    //if we already know it is
    if (this.pos[method]) {
      return true;
    }
    //if we already know this is incompatible
    if (tagset[method] && !this.canBe(method)) {
      return false;
    }
    //is it a known 'is' method?
    method = method.toLowerCase();
    if (is[method]) {
      return is[method](this);
    }
    return false;
  }
  //return it as something
  render(method) {
    if (fns.isFunction(method)) {
      return method(this);
    }
    //is it known?
    method = method.toLowerCase();
    if (render[method]) {
      return render[method](this);
    }
    return '';
  }

}
module.exports = Term;
