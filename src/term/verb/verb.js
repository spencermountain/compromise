'use strict';
const Term = require('../term.js');
const conjugate = require('./conjugate/conjugate.js');
const negate = require('./negate.js');

const verbTags = {
  infinitive: 'Infinitive',
  present: 'PresentTense',
  past: 'PastTense',
  gerund: 'Gerund',
  actor: 'Actor',
  future: 'FutureTense',
  pluperfect: 'PluperfectTense',
  perfect: 'PerfectTense',

  PerfectTense: 'PerfectTense',
  PluperfectTense: 'PluperfectTense',
  FutureTense: 'FutureTense',
  PastTense: 'PastTense',
  PresentTense: 'PresentTense',
};

class Verb extends Term {
  constructor(str, tag) {
    super(str);
    this.tag = tag;
    this.pos['Verb'] = true;
    this.conjugations = {}; //cached conjugations
    //if we've been told which
    this.pos[tag] = true;
    if (tag && verbTags[tag]) {
      this.conjugations[tag] = this.normal;
    }
  }


  //retrieve a specific form
  conjugation() {
    //check cached conjugations
    this.conjugations = this.conjugate();
    let keys = Object.keys(this.conjugations);
    for(let i = 0; i < keys.length; i++) {
      if (this.conjugations[keys[i]] === this.normal) {
        return verbTags[keys[i]];
      }
    }
    return verbTags[predict(this.normal)];
  }

  conjugate() {
    this.conjugations = conjugate(this.normal);
    return this.conjugations;
  }
  to_past() {
    let tense = 'past';
    if (!this.conjugations[tense]) {
      this.conjugate(this.normal);
    }
    this.tag = verbTags[tense];
    this.changeTo(this.conjugations[tense]);
    return this.conjugations[tense];
  }
  to_present() {
    let tense = 'present';
    if (!this.conjugations[tense]) {
      this.conjugate(this.normal);
    }
    this.tag = verbTags[tense];
    this.changeTo(this.conjugations[tense]);
    return this.conjugations[tense];
  }
  to_future() {
    let tense = 'future';
    if (!this.conjugations[tense]) {
      this.conjugate(this.normal);
    }
    this.tag = verbTags[tense];
    this.changeTo(this.conjugations[tense]);
    return this.conjugations[tense];
  }


  //is this verb negative already?
  isNegative() {
    const str = this.normal;
    if (str.match(/(n't|\bnot\b)/)) {
      return true;
    }
    return false;
  }

  negate(form) {
    if (this.isNegative()) {
      return this.text;
    }
    this.changeTo(negate(this, form));
    return this.text;

  }

}
Verb.fn = Verb.prototype;

// let v = new Verb("walk", "asdf")
// console.log(v.form())

module.exports = Verb;
