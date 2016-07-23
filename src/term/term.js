'use strict';
//a Text() is a list of sentences, which are a list of Terms
const fns = require('../fns');
const log = require('../log');
const tagset = require('../tagset');
const info = require('./info');
const transforms = require('./transforms');
const render = require('./render/render');
const normalize = require('./transforms/term/normalize');
const path = 'term';

class Term {
  constructor(str, context) {
    this.str = fns.ensureString(str);
    this.normal = normalize(this.text);
    this.context = fns.ensureObject(context);
    this.whitespace = fns.ensureObject(this.context.whitespace);
    this.whitespace.before = fns.ensureString(this.whitespace.before);
    this.whitespace.after = fns.ensureString(this.whitespace.after);
    this.transforms = transforms.Term;
    this.infos = info.Term;
    this.pos = {};
  }

  set text(str) {
    this.str = fns.ensureString(str);
    this.normal = normalize(this.text);
  }
  get text() {
    return fns.ensureString(this.str);
  }

  //check if the term is compatible with a pos tag.
  canBe(tag) {
    //already compatible..
    if (this.pos[tag]) {
      return true;
    }
    //unknown tag..
    if (!tagset[tag]) {
      //huh? sure, go for it.
      return true;
    }
    //consult tagset's incompatible tags
    let not = Object.keys(tagset[tag].not);
    for (let i = 0; i < not.length; i++) {
      if (this.pos[not[i]]) {
        return false;
      }
    }
    return true;
  }

  tag(tag, reason) {
    log.tag(this, tag, reason, path);
    //reset term, if necessary
    if (this.canBe(tag) === false) {
      this.pos = {};
      this.transforms = {};
      this.infos = {};
    }
    let tags = tagset[tag].is;
    for (let i = 0; i < tags.length; i++) {
      this.pos[tags[i]] = true;
      fns.extend(this.transforms, transforms[tags[i]]);
    }
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
    //is it known?
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
