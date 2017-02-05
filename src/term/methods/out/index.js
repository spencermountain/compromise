'use strict';
const renderHtml = require('./renderHtml');
const fns = require('../../paths').fns;

const colors = {
  Noun: 'blue',
  Plural: 'blue',
  Singular: 'blue',
  Pronoun: 'blue',
  Possessive: 'blue',
  NounPhrase: 'blue',
  Place: 'blue',
  Person: 'blue',
  City: 'blue',

  Adjective: 'red',

  Verb: 'green',
  Auxillary: 'green',
  Negative: 'green',
  VerbPhrase: 'green',
  PastTense: 'green',
  PresentTense: 'green',
  FutureTense: 'green',
  Modal: 'green',
  Infinitive: 'green',
  Gerund: 'green',
  Copula: 'green',

  Value: 'magenta',
  TextValue: 'magenta',
  Cardinal: 'magenta',
  Ordinal: 'magenta',

  Adverb: 'cyan',

  Conjunction: 'yellow',
  Preposition: 'yellow',
  Determiner: 'yellow'
};

const methods = {
  /** a pixel-perfect reproduction of the input, with whitespace preserved */
  text: function() {
    return this.whitespace.before + this.text + this.whitespace.after;
  },
  /** a lowercased, punctuation-cleaned, whitespace-trimmed version of the word */
  normal: function() {
    return this.normal;
  },
  /** the &encoded term in a span element, with POS as classNames */
  html: function() {
    return renderHtml(this);
  },
  /** a simplified response for Part-of-Speech tagging*/
  tags: function() {
    return {
      text: this.text,
      normal: this.normal,
      tags: Object.keys(this.tag)
    };
  },
  /** check-print information for the console */
  debug: function() {
    let tags = Object.keys(this.tag).map((tag) => {
      if (colors[tag]) {
        return fns[colors[tag]](tag);
      }
      return tag;
    }).join(', ');
    let word = this.text;
    // word = this.whitespace.before + word + this.whitespace.after;
    word = '\'' + fns.yellow(word || '-') + '\'';
    if (this.dirty) {
      // word += fns.red('*');
    }
    let silent = '';
    if (this.silent_term) {
      silent = '[' + this.silent_term + ']';
    }
    word = fns.leftPad(word, 25);
    word += fns.leftPad(silent, 5);
    console.log('   ' + word + '   ' + '     - ' + tags);
  }
};

const addMethods = (Term) => {
  let args = arguments;
  //hook them into result.proto
  Term.prototype.out = function(fn) {
    if (!methods[fn]) {
      fn = 'text';
    }
    return methods[fn].apply(this, args);
  };
  return Term;
};

module.exports = addMethods;
