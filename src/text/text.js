'use strict';
const sentence_parser = require('./sentence_parser.js');
// const Sentence = require('../sentence/sentence.js');
const Question = require('../sentence/question/question.js');
const Statement = require('../sentence/statement/statement.js');
const fns = require('../fns.js');

//a text object is a series of sentences, along with the generic methods for transforming them
class Text {
  constructor(str, options) {
    options = options || {};
    const the = this;
    if (typeof str === 'string') {
      this.raw_text = str;
    } else if (typeof str === 'number') {
      this.raw_text = '' + str;
    } else {
      this.raw_text = '';
    }
    //build-up sentence/statement methods
    this.sentences = sentence_parser(this.raw_text).map(function(s) {
      let last_char = s.slice(-1);
      if (last_char === '?') { //TODO:be smartr
        return new Question(s, options);
      }
      return new Statement(s, options);
    });

    this.contractions = {
      // he'd -> he would
      expand: function() {
        the.sentences = the.sentences.map(function(s) {
          return s.contractions.expand();
        });
        return the;
      },
      // he would -> he'd
      contract: function() {
        the.sentences = the.sentences.map(function(s) {
          return s.contractions.contract();
        });
        return the;
      }
    };
  }


  //map over sentence methods
  text() {
    const arr = this.sentences.map(function(s) {
      return s.text();
    });
    return fns.flatten(arr).join('');
  }
  normal() {
    const arr = this.sentences.map(function(s) {
      return s.normal();
    });
    return fns.flatten(arr).join(' ');
  }

  //further 'lemmatisation/inflection'
  root() {
    const arr = this.sentences.map(function(s) {
      return s.root();
    });
    return fns.flatten(arr).join(' ');
  }

  terms() {
    const arr = this.sentences.map(function(s) {
      return s.terms;
    });
    return fns.flatten(arr);
  }
  tags() {
    return this.sentences.map(function(s) {
      return s.tags();
    });
  }

  //a regex-like lookup for a sentence.
  // returns an array of terms
  match(str, options) {
    let arr = [];
    for(let i = 0; i < this.sentences.length; i++) {
      arr = arr.concat(this.sentences[i].match(str, options));
    }
    return arr;
  }
  replace(str, replacement, options) {
    for(let i = 0; i < this.sentences.length; i++) {
      this.sentences[i].replace(str, replacement, options);
    }
    return this;
  }

  //transformations
  to_past() {
    this.sentences = this.sentences.map(function(s) {
      return s.to_past();
    });
    return this;
  }
  to_present() {
    this.sentences = this.sentences.map(function(s) {
      return s.to_present();
    });
    return this;
  }
  to_future() {
    this.sentences = this.sentences.map(function(s) {
      return s.to_future();
    });
    return this;
  }
  negate() {
    this.sentences = this.sentences.map(function(s) {
      return s.negate();
    });
    return this;
  }


  //returns an array with elements from this.sentences[i].func()
  generate_arr(func) {
    let arr = [];
    for (let i = 0; i < this.sentences.length; i++) {
      arr = arr.concat(this.sentences[i][func]());
    }
    return arr;
  }

  //parts of speech
  nouns() {
    return this.generate_arr('nouns');
  }
  adjectives() {
    return this.generate_arr('adjectives');
  }
  verbs() {
    return this.generate_arr('verbs');
  }
  adverbs() {
    return this.generate_arr('adverbs');
  }

  //mining
  people() {
    return this.generate_arr('people');
  }
  places() {
    return this.generate_arr('places');
  }
  organizations() {
    return this.generate_arr('organizations');
  }
  dates() {
    return this.generate_arr('dates');
  }
  values() {
    return this.generate_arr('values');
  }

  //more generic named-entity recognition
  topics() {
    //consolodate topics across sentences
    let obj = {};
    for(let i = 0; i < this.sentences.length; i++) {
      let topics = this.sentences[i].topics();
      for(let o = 0; o < topics.length; o++) {
        if (obj[topics[o].text]) {
          obj[topics[o].text].count += topics[o].count;
        } else {
          obj[topics[o].text] = topics[o];
        }
      }
    }
    //sort by frequency
    let arr = Object.keys(obj).map((k) => obj[k]);
    return arr.sort((a, b) => {
      if (a.count > b.count) {
        return -1;
      } else {
        return 1;
      }
    });
  }
  //'semantic' word-count, skips over implicit terms and things
  word_count() {
    let count = 0;
    for(let i = 0; i < this.sentences.length; i++) {
      count += this.sentences[i].word_count();
    }
    return count;
  }
}
Text.fn = Text.prototype;

module.exports = Text;
