'use strict';
const Sentence = require('../sentence/sentence');
const TermList = require('../termList/termList');
const SentenceList = require('../sentenceList/sentenceList');
const split_sentences = require('./split_sentences');
const fns = require('../fns');
const methods = require('../term/methods');

class Text {
  constructor(input, context) {
    //parse-out sentences
    this._sentences = split_sentences(input);
    this._sentences = this._sentences.map((txt) => {
      let c = fns.copy(context);
      c.parent = this; //give it our ref
      return new Sentence(txt, c);
    });

    //add filters
    Object.keys(methods.filters).forEach((method) => {
      this[method] = () => {
        return this.terms()[method]();
      };
    });
    //add map over info methods
    Object.keys(methods.infos).forEach((method) => {
      this[method] = () => {
        return methods.infos[method](this.arr);
      };
    });
    //add transform methods
    Object.keys(methods.transforms).forEach((method) => {
      this[method] = () => {
        this.terms()[method]();
        return this;
      };
    });

  }
  /** return a full termlist of all sentences*/
  terms() {
    let terms = this._sentences.reduce((arr, s) => {
      arr = arr.concat(s.arr);
      return arr;
    }, []);
    let c = fns.copy(this.context);
    c.parent = this;
    return new TermList(terms, c);
  }
  sentences() {
    return new SentenceList(this._sentences);
  }

  clone() {
    let txt = this.text();
    let c = fns.copy(this.context);
    return new Text(txt, c);
  }
  /** render the text, as it came in */
  plaintext() {
    return this._sentences.reduce((str, s) => {
      str += s.text();
      return str;
    }, '');
  }
  pretty() {
    this.sentences().pretty();
  }

}
module.exports = Text;
