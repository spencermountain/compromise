'use strict';
const Result = require('../../index');
const Person = require('./person');
//this is used for pronoun and honorifics, and not intented for more-than grammatical use (see #117)
const guessGender = require('./guessGender');

class People extends Result {
  constructor(list) {
    super(list);
    // this.check();
    this.match('#Person+');
    // this.clone();
    // let people = this.match('#Person+');
    // people.splitAfter('#ClauseEnd');
    this.people = this.list.map((ts) => {
      return new Person(ts.terms);
    });
    // return this;
  }
  parse() {
      return this.people.map((p) => p.parse());
      // let obj = {
      //   honorific: this.honorific(),
      //   pronoun: this.pronoun(),
      // };
      // let m = this.clone().remove('#Honorific');
      // m.remove('the *'); //jabba the hut
      // m.match('#Person');
      // // m.check();
      // //1-names are sneaky
      // if (m.count === 1) {
      //   let term = m.terms[0];
      //   if (term.tag.MaleName || term.tag.FemaleName) {
      //     obj.firstName = m.normal();
      //   }
      // }
      // if (m.count === 2) {
      //   obj.firstName = m.get(0).normal();
      //   obj.lastName = m.get(1).normal();
      // }
      // if (m.count === 3) {
      //   obj.firstName = m.get(0).normal();
      //   obj.middleName = m.get(1).normal();
      //   obj.lastName = m.get(2).normal();
      // }
      return [];
    }
    //getters

  //the given one, Mr, Ms, or null
  honorific() {
    let m = this.match('#Honorific');
    if (m.found) {
      return m.text();
    }
    let guess = guessGender(this);
    if (guess === 'Male') {
      return 'Mr.';
    }
    if (guess === 'Female') {
      return 'Ms.'; //marriage-agnostic honorfic?
    }
    return null;
  }

  firstName() {
    return this.match('^#Person').normal();
  }
  middleName() {}
  lastName() {}

  pronoun() {
    const pronouns = {
      Male: 'he',
      Female: 'she',
    };
    let gender = guessGender(this);
    //return 'singular they' if no gender is found
    return pronouns[gender] || 'they';
  }

  //transformations
  addHonorific() {
    if (!this.match('#Honorific').found) {
      let str = this.honorific();
      if (str) {
        this.append(str);
      }
    }
    return this.all();
  }
  stripHonorific() {
    this.remove('#Honorific');
    return this.all();
  }

}

module.exports = People;
