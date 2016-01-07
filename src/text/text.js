'use strict';
const sentence_parser = require('./sentence_parser.js');
const Sentence = require('../sentence/sentence.js');
const ngram = require('./ngram.js');
const fns = require('../fns.js');

//a text object is a series of sentences, along with the generic methods for transforming them
class Text {
  constructor(str) {
    const the = this;
    this.raw_text = str || '';
    //build-up sentence methods
    this.sentences = sentence_parser(str).map(function(s) {
      return new Sentence(s);
    });

    this.contractions = {
      // he'd -> he would
      expand: function() {
        return the.sentences.map(function(s) {
          return s.contractions.expand();
        });
      },
      // he would -> he'd
      contract: function() {
        return the.sentences.map(function(s) {
          return s.contractions.contract();
        });
      }
    };
  }

  //Text methods
  ngram(options) {
    let terms = this.terms();
    terms = terms.map(function(t) {
      return t.normal;
    });
    return ngram(terms, options);
  }

  //map over sentence methods
  text() {
    const arr = this.sentences.map(function(s) {
      return s.text();
    });
    return fns.flatten(arr).join(' ');
  }
  normalized() {
    const arr = this.sentences.map(function(s) {
      return s.normalized();
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
  tags() {
    return this.sentences.map(function(s) {
      return s.tags();
    });
  }
  syllables() {
    return this.sentences.reduce(function(arr, s) {
      arr = arr.concat(s.syllables());
      return arr;
    }, []);
  }
  to_past() {
    return this.sentences.map(function(s) {
      return s.to_past();
    });
  }
  to_present() {
    return this.sentences.map(function(s) {
      return s.to_present();
    });
  }
  to_future() {
    return this.sentences.map(function(s) {
      return s.to_future();
    });
  }
  negate() {
    return this.sentences.map(function(s) {
      return s.negate();
    });
  }
  //mining
  people() {
    let arr = [];
    for(let i = 0; i < this.sentences.length; i++) {
      arr = arr.concat(this.sentences[i].people());
    }
    return arr;
  }
  places() {
    let arr = [];
    for(let i = 0; i < this.sentences.length; i++) {
      arr = arr.concat(this.sentences[i].places());
    }
    return arr;
  }
  organisations() {
    let arr = [];
    for(let i = 0; i < this.sentences.length; i++) {
      arr = arr.concat(this.sentences[i].organisations());
    }
    return arr;
  }
  dates() {
    let arr = [];
    for(let i = 0; i < this.sentences.length; i++) {
      arr = arr.concat(this.sentences[i].dates());
    }
    return arr;
  }
  values() {
    let arr = [];
    for(let i = 0; i < this.sentences.length; i++) {
      arr = arr.concat(this.sentences[i].values());
    }
    return arr;
  }
}
Text.fn = Text.prototype;

module.exports = Text;
