'use strict';
const sentence_parser = require('./sentence_parser.js');
const Sentence = require('../sentence/sentence.js');
const ngram = require('./ngram.js');
const fns = require('../fns.js');

//a text object is a series of sentences, along with the generic methods for transforming them
class Text {
  constructor(str) {
    this.str = str || '';
    this.sentences = sentence_parser(str).map(function(s) {
      return new Sentence(s);
    });
  }

  //Text methods
  ngram() {
    let terms = this.terms();
    terms = terms.map(function(t) {
      return t.normal;
    });
    return ngram(terms);
  }

  //map over sentence methods
  text() {
    const arr = this.sentences.map(function(s) {
      return s.text();
    });
    return fns.flatten(arr).join(' ');
  }
  terms() {
    const arr = this.sentences.map(function(s) {
      return s.terms;
    });
    return fns.flatten(arr);
  }
  normalised() {
    const arr = this.sentences.map(function(s) {
      return s.normalized();
    });
    return fns.flatten(arr).join(' ');
  }
  parents() {
    return this.sentences.map(function(s) {
      return s.parents();
    });
  }
}

module.exports = Text;
