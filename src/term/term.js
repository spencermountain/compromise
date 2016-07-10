'use strict';
//a Text() is a list of sentences, which are a list of Terms
const fns = require('../fns');
const inspect = require('./inspect/inspect')
const transform = require('./transform/transform')
const render = require('./render/render')

class Term {
  constructor(str, context) {
    this.text = fns.ensureString(str);
    this.context = fns.ensureObject(context);
    this.whitespace = fns.ensureObject(this.context.whitespace);
    this.whitespace.before = fns.ensureString(this.whitespace.before)
    this.whitespace.after = fns.ensureString(this.whitespace.after)
  }

  //change the text, return this
  to(method) {
    if (fns.isFunction(method)) {
      return method(this)
    }
    return this
  }

  //inspect, analyze, return boolean
  is(method) {
    if (fns.isFunction(method)) {
      return method(this)
    }
    return false
  }

  //get some data back
  get(method) {
    if (fns.isFunction(method)) {
      return method(this)
    }
    return null
  }

  //render it as something
  return(method) {
    if (fns.isFunction(method)) {
      return method(this)
    }
    return ''
  }
}
module.exports = Term
