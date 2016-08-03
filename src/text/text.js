'use strict';
const Sentence = require('../sentence/sentence');
const TermList = require('../termList/termList');
const SentenceList = require('../sentenceList/sentenceList');
// const plurals = require('../tags').plurals
const split_sentences = require('./split_sentences');
const fns = require('../fns');
// const term_methods = require('../term/methods');
// const tags = require('../tags').tags


class Text {
  constructor(input, context) {
    //parse-out sentences
    this._sentences = split_sentences(input);
    this._sentences = this._sentences.map((txt) => {
      let c = fns.copy(context);
      c.parent = this; //give it our ref
      return new Sentence(txt, c);
    });

    let terms = this._sentences.reduce((arr, s) => {
      arr = arr.concat(s._terms);
      return arr;
    }, []);
    this._terms = new TermList(terms);
  }
  terms() {
    return this._terms;
  }
  sentences() {
    return new SentenceList(this._sentences);
  }
  text() {
    return this._sentences.reduce((str, s) => {
      for (let i = 0; i < s.terms.length; i++) {
        str += ' ' + s.terms[i].text + ' ';
      }
      return str;
    }, '');
  }

}
module.exports = Text;
