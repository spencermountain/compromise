'use strict';
const Text = require('../../index');
// const Noun = require('./noun');

class Things extends Text {
  data() {
    return this.mapTerms((t) => {
      return {
        text: t.text
      };
    });
  }
  static find(r) {
    r = r.clauses();
    //find people/places/organizations
    let yup = r.people();
    yup.concat(r.places());
    yup.concat(r.organizations());
    //return them to normal ordering
    yup.sort('chronological');
    // yup.unique() //? not sure
    return yup;
  }
}

module.exports = Things;
