'use strict';
const Term = require('../term.js');
const article = require('./article.js');
const is_plural = require('./is_plural.js');
const is_place = require('./place/is_place.js');
const is_person = require('./person/is_person.js');
const pronoun = require('./pronoun.js');
const is_value = require('./value/is_value.js');
const is_date = require('./date/is_date.js');
const is_organisation = require('./organisation/is_organisation.js');
const singularize = require('./singularize.js');
const pluralize = require('./pluralize.js');
const is_uncountable = require('./is_uncountable.js');

class Noun extends Term {
  constructor(str, tag) {
    super(str);
    this.tag = tag;
    this.pos['Noun'] = true;
    if (tag) {
      this.pos[tag] = true;
    }
  }
  //noun methods
  article() {
    return article(this.text);
  }
  pronoun() {
    if (this.is_organisation() || this.is_place() || this.is_value()) {
      return 'it';
    }
    return pronoun(this.normal);
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
  //sub-classes
  is_person() {
    return is_person(this.normal);
  }
  is_organisation() {
    return is_organisation(this.normal, this.text);
  }
  is_date() {
    return is_date(this.normal);
  }
  is_value() {
    return is_value(this.normal);
  }
  is_place() {
    return is_place(this.normal);
  }

}

Noun.fn = Noun.prototype;

module.exports = Noun;

// let t = new Noun('NDA');
// console.log(t.article());
