'use strict';
//a Text() is a list of sentences, which are a list of Terms
const fns = require('../fns');
// const debug = require('../debug');
let log = function() {};
const Sentence = require('../sentence/sentence');
const split_sentences = require('./split_sentences');
const get = require('./get/get');
const transforms = require('./transforms/transforms');
const render = require('./render/render');

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

  //change the text, return this
  to(method) {
    if (fns.isFunction(method)) {
      return method(this);
    }
    //is it known?
    method = fns.titleCase(method);
    if (transforms[method]) {
      return transform[method](this);
    }
    //else, apply it to each sentence
    this.sentences.map((s) => {
      return s.to(method);
    });
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
  render(method) {
    log('====' + method + '====');
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
module.exports = Text;
