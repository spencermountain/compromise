'use strict';
const Text = require('../../index');
// const Noun = require('./noun');

class Things extends Text {
  parse() {
    return this.terms().map((t) => {
      return {
        text: t.text
      };
    });
  }
  static find(r) {
    r = r.splitAfter('#Comma');
    let yup = r.people();
    yup.concat(r.places());
    yup.concat(r.organizations());
    yup = yup.clone();
    // yup.toUpperCase();
    return yup;
  }
}

module.exports = Things;
