// not all cultures use the firstname-lastname practice. this does make some assumptions.
'use strict';
const Noun = require('../noun.js');
const guess_gender = require('./gender.js');
const parse_name = require('./parse_name.js');

//capitalizes first letter of every word in a string
const title_case = function (s) {
  if (!s) {
    return s;
  }
  s = s.replace(/(^\w|-\w| \w)/g, function (v) {
    return v.toUpperCase();
  });
  return s;
};

//capitalizes last name taking into account Mc-, Mac-, O'-
const lastname_case = function (s) {
  if (!s) {
    return s;
  }

  s = title_case(s);
  s = s.replace(/(Mc|Mac|O\')(\w)/g, function (v) {
    return v.replace(/\w$/, function (w) {
      return w.toUpperCase();
    });
  });
  return s;
};

class Person extends Noun {
  constructor(str, tag) {
    super(str);
    this.tag = tag;
    this.pos['Person'] = true;
    this.honourific = null;
    this.firstName = null;
    this.middleName = null;
    this.lastName = null;
    this.parse();
    if (this.isPronoun()) {
      this.pos['Pronoun'] = true;
    }
    if (tag) {
      this.pos[tag] = true;
    }
  }

  isPronoun() {
    let whitelist = {
      'he': true,
      'she': true,
      'i': true,
      'you': true,
    };
    return whitelist[this.normal];
  }

  //proper normalised name without the cruft
  root() {
    if (this.isPronoun()) {
      return this.normal;
    }
    let str = '';

    if (this.firstName) {
      str = this.firstName.toLowerCase();
    }
    if (this.middleName) {
      str += ' ' + this.middleName.toLowerCase();
    }
    if (this.lastName) {
      str += ' ' + this.lastName.toLowerCase();
    }
    return str.trim() || this.normal;
  }

  //turn a multi-word string into [first, middle, last, honourific]
  parse() {
    let o = parse_name(this.normal, this.text.trim());
    this.honourific = o.honourific;
    this.firstName = title_case(o.firstName);
    this.middleName = title_case(o.middleName);
    this.lastName = lastname_case(o.lastName);
  }

  gender() {
    //if we already know it, from the lexicon
    if (this.pos.FemalePerson) {
      return 'Female';
    }
    if (this.pos.MalePerson) {
      return 'Male';
    }
    return guess_gender(this.normal);
  }

  pronoun() {
    const pronouns = {
      Male: 'he',
      Female: 'she',
    };
    let gender = this.gender();
    //return 'singular they' if no gender is found
    return pronouns[gender] || 'they';
  }

}
Person.fn = Person.prototype;
module.exports = Person;
/*
let p = new Person('Jani-Lee K. o\'brien-macneil');
console.log(p);
let z = new Person('Mary-Jane Willson-Johnson');
console.log(z);*/
