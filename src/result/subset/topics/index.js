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
    let yup = r.people();
    yup.concat(r.places());
    yup.concat(r.organizations());
    yup = yup.clone();
    // yup.toUpperCase();
    return yup;
  }
}

module.exports = Things;
