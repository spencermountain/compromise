'use strict';
//a Text() is a list of sentences, which are a list of Terms
const fns = require('../fns');
const log = require('../log');
const set_tag = require('./tag');
const render = require('./render/render');
const normalize = require('./transforms/term/normalize');
const info = require('./info');
const path = 'term';

class Term {
  constructor(str, context) {
    this.str = fns.ensureString(str);
    this.normal = normalize(this.text);
    this.context = fns.ensureObject(context);
    this.whitespace = fns.ensureObject(this.context.whitespace);
    this.whitespace.before = fns.ensureString(this.whitespace.before);
    this.whitespace.after = fns.ensureString(this.whitespace.after);
    this.pos = {};
    this.transforms = {};
    this.infos = {};
    this.tag('Term');
  }

  set text(str) {
    this.str = fns.ensureString(str);
    this.normal = normalize(this.text);
  }
  get text() {
    return fns.ensureString(this.str);
  }

  tag(tag, reason) {
    log.tag(this, tag, reason, path);
    set_tag(this, tag, reason);

    return this;
  }

  //change the text, return this
  to(method) {
    if (fns.isFunction(method)) {
      return method(this);
    }
    //is it known?
    if (this.transforms[method]) {
      return this.transforms[method](this);
    }
    log.change('no method ' + method, 'term');
    return this;
  }

  //get some data back
  info(method) {
    if (fns.isFunction(method)) {
      return method(this);
    }
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
    //if we already know it is
    if (this.pos[method]) {
      return true;
    }
    //if we already know this is incompatible
    if (tagset[method] && !this.canBe(method)) {
      return false;
    }
    //is it a known 'is' method?
    if (is[method]) {
      return is[method](this);
    }
    return false;
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
