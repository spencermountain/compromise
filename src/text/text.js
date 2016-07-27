'use strict';
//a Text() is a list of sentences, which are a list of Terms
const fns = require('../fns');
// const debug = require('../debug');
let log = function() {};
const Sentence = require('../sentence/sentence');
const Terms = require('../terms/terms');
const split_sentences = require('./split_sentences');
const info = require('./info');
const transforms = require('./transforms/transforms');
const render = require('./render');

class Text {
  constructor(str, context) {
    this.input = fns.ensureString(str);
    this.context = fns.ensureObject(context);
    this.sentences = split_sentences(this.input);
    this.sentences = this.sentences.map((txt) => {
      let c = fns.copy(context);
      c.parent = this; //give it our ref
      return new Sentence(txt, c);
    });
    log(this);
  }

  /** return a subset of (flattened) terms with this condition */
  if(str) {
    let terms = this.sentences.reduce((arr, s) => {
      arr = arr.concat(s.if(str).terms)
      return arr
    }, [])
    return new Terms(terms)
  }

  /** change the text, return this */
  to(method) {
    if (fns.isFunction(method)) {
      return method(this);
    }
    //is it known?
    method = method.toLowerCase();
    if (transforms[method]) {
      return transform[method](this);
    }
    //else, apply it to each sentence
    this.sentences = this.sentences.map((s) => {
      return s.to(method);
    });
    return this;
  }

  /**get, analyze, return boolean */
  is(method) {
    if (fns.isFunction(method)) {
      return method(this);
    }
    //else, apply it to each sentence as a map
    method = method.toLowerCase();
    return this.sentences.map((s) => {
      return s.is(method);
    });
    return null;
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
    //otherwise, try it on each sentence
    return this.sentences.map((s) => {
      return s.info(method);
    });
  }

  /** return it as something */
  render(method) {
    log('====' + method + '====');
    if (fns.isFunction(method)) {
      return method(this);
    }
    //is it known?
    method = method.toLowerCase();
    if (render[method]) {
      return render[method](this);
    }
    //otherwise, try it on each sentence
    return this.sentences.map((s) => {
      return s.render(method);
    });
  }
}
module.exports = Text;
