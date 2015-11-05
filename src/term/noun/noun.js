'use strict';
const Term = require('../term.js');
const article = require('./article.js');
const is_plural = require('./is_plural.js');
const is_person = require('./is_person.js');
const singularize = require('./singularize.js');
const pluralize = require('./pluralize.js');
const is_uncountable = require('./is_uncountable.js');

class Noun extends Term {
  constructor(str) {
    super(str);
    this.parent = 'noun';
  }
  //noun methods
  article() {
    return article(this.normal);
  }

  is_plural() {
    return is_plural(this.normal);
  }
  is_uncountable() {
    return is_uncountable(this.normal);
  }
  pluralize() {
    return pluralize(this.normal);
  }
  singularize() {
    return singularize(this.normal);
  }
  //mining
  is_person() {
    return is_person(this.normal);
  }
  is_date() {
    const months = /(january|february|march|april|may|june|july|august|september|october|november|december|jan|feb|mar|apr|aug|sept|oct|nov|dec)/i;
    const times = /1?[0-9]:[0-9]{2}/;
    const days = /\b(monday|tuesday|wednesday|thursday|friday|saturday|sunday|mon|tues|wed|thurs|fri|sat|sun)\b/i;
    if (this.normal.match(months) || this.normal.match(times) || this.normal.match(days)) {
      return true;
    }
    return false;
  }

}

// let t = new Noun("forks")
// console.log(t.singularize())

module.exports = Noun;
