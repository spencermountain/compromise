'use strict';
const Sentence = require('../sentence/sentence');
const TermList = require('../termList/termList');
const SentenceList = require('../sentenceList/sentenceList');
const split_sentences = require('./split_sentences');
const addMethods = require('./addMethods');
const fns = require('../fns');


class Text {
  constructor(input, context) {
    //parse-out sentences
    this._sentences = split_sentences(input);
    this._sentences = this._sentences.map((txt) => {
      let c = fns.copy(context);
      c.parent = this; //give it our ref
      return new Sentence(txt, c);
    });
    addMethods(this);
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
