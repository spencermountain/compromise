'use strict';
//a Sentence() is a list of Terms
const fns = require('../fns');
const Term = require('../term/Term');
const split_terms = require('./split_terms')
const inspect = require('./inspect/inspect')
const transform = require('./transform/transform')
const render = require('./render/render')

class Sentence {
  constructor(str, context) {
    this.input = fns.ensureString(str);
    this.context = context;
    this.terms = split_terms(this.input)
    this.terms = this.terms.map((o) => {
      let c = fns.copy(context)
      c.whitespace = {
        before: o.before || '',
        after: o.after || '',
      }
      c.sentence_ref = this //give it a ref
      return new Term(o.text, c)
    })
  }

  //change the text, return this
  to(method) {
    if (fns.isFunction(method)) {
      return method(this)
    }
    //is it known?
    if (transform[method]) {
      return transform[method](this)
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
    //is it known?
    if (inspect[method]) {
      return inspect[method](this)
    }
    return null
  }

  //render it as something
  return(method) {
    if (fns.isFunction(method)) {
      return method(this)
    }
    //is it known?
    if (render[method]) {
      return render[method](this)
    }
    return ''
  }
}
module.exports = Sentence
