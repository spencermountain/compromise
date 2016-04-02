'use strict';
const Term = require('../term.js');
const conjugate = require('./conjugate/conjugate.js');
const negate = require('./verb_negate.js');
const predict_form = require('./conjugate/predict_form.js');

const verbTags = {
  infinitive: 'Infinitive',
  present: 'PresentTense',
  past: 'PastTense',
  gerund: 'Gerund',
  actor: 'Actor',
  future: 'FutureTense',
  pluperfect: 'PluperfectTense',
  perfect: 'PerfectTense'
};

class Verb extends Term {
  constructor(str, tag) {
    super(str);
    this.tag = tag;
    this.pos['Verb'] = true;
    //if we've been told which
    if (tag) {
      this.pos[tag] = true;
    }
  }

  //'root' for a verb means infinitive
  root() {
    return this.conjugate().infinitive;
  }

  //retrieve a specific form
  conjugation() {
    //check cached conjugations
    let conjugations = this.conjugate();
    let keys = Object.keys(conjugations);
    for(let i = 0; i < keys.length; i++) {
      if (conjugations[keys[i]] === this.normal) {
        return verbTags[keys[i]];
      }
    }
    //try to guess
    return verbTags[predict_form(this.normal)];
  }
  tense() {
    //map conjugation onto past/present/future
    let tenses = {
      infinitive: 'present',
      gerund: 'present',
      actor: 'present',
      present: 'present',
      past: 'past',
      future: 'future',
      perfect: 'past',
      pluperfect: 'past',
      future_perfect: 'future'
    };
    let c = this.conjugation();
    return tenses[c] || 'present';
  }

  conjugate() {
    return conjugate(this.normal);
  }
  to_past() {
    let tense = 'past';
    let conjugations = this.conjugate(this.normal);
    this.tag = verbTags[tense];
    this.changeTo(conjugations[tense]);
    return conjugations[tense];
  }
  to_present() {
    let tense = 'present';
    let conjugations = this.conjugate(this.normal);
    this.tag = verbTags[tense];
    this.changeTo(conjugations[tense]);
    return conjugations[tense];
  }
  to_future() {
    let tense = 'future';
    let conjugations = this.conjugate(this.normal);
    this.tag = verbTags[tense];
    this.changeTo(conjugations[tense]);
    return conjugations[tense];
  }

  //is this verb negative already?
  isNegative() {
    const str = this.normal;
    //yep, pretty simple
    if (str.match(/(n't|\bnot\b)/)) {
      return true;
    }
    return false;
  }

  //turn 'walked' to "didn't walk"
  negate() {
    this.changeTo(negate(this));
    return this;
  }
}
Verb.fn = Verb.prototype;

module.exports = Verb;

// let v = new Verb('stunk up');
// console.log(v.negate());
