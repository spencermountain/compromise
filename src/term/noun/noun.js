'use strict';
const Term = require('../term.js');
const article = require('./article.js');
const is_plural = require('./is_plural.js');
const is_place = require('./place/is_place.js');
const is_person = require('./person/is_person.js');
const pronoun = require('./pronoun.js');
const is_value = require('./value/is_value.js');
const is_date = require('./date/is_date.js');
const is_organization = require('./organization/is_organization.js');
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
    if (this.is_plural()) {
      this.pos['Plural'] = true;
    }
  }
  //noun methods
  article() {
    //if it's a person, it's he/she, not a/an
    if (this.pos['Person']) {
      return this.pronoun();
    }
    //groups of people are 'they'
    if (this.pos['Organization']) {
      return 'they';
    }
    return article(this.text);
  }
  root() {
    return this.singularize();
  }
  pronoun() {
    if (this.is_organization() || this.is_place() || this.is_value()) {
      return 'it';
    }
    return pronoun(this.normal);
  }
  is_plural() {
    if (this.pos['Date'] || this.pos['Possessive']) {
      return false;
    } else if (this.has_abbreviation()) { //contractions & possessives are not plural
      return false;
    } else {
      return is_plural(this.normal);
    }
  }
  is_uncountable() {
    return is_uncountable(this.strip_apostrophe());
  }
  pluralize() {
    return pluralize(this.strip_apostrophe());
  }
  singularize() {
    return singularize(this.strip_apostrophe());
  }
  //sub-classes
  is_person() {
    //don't overwrite dates, etc
    if (this.pos['Date']) {
      return false;
    }
    return is_person(this.strip_apostrophe());
  }
  is_organization() {
    //don't overwrite urls
    if (this.pos['Url']) {
      return false;
    }
    return is_organization(this.strip_apostrophe(), this.text);
  }
  is_date() {
    return is_date(this.strip_apostrophe());
  }
  is_value() {
    //don't overwrite dates, etc
    if (this.pos['Date'] || this.pos['HashTag']) {
      return false;
    }
    return is_value(this.strip_apostrophe());
  }
  is_place() {
    return is_place(this.strip_apostrophe());
  }
  all_forms() {
    return {
      'singular': this.singularize(),
      'plural': this.pluralize(),
      'normal': this.normal
    };
  }

}

Noun.fn = Noun.prototype;

module.exports = Noun;

//let t = new Noun('mouse');
//console.log(t.all_forms());
