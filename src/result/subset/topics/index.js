'use strict';
const Text = require('../../index');
// const Noun = require('./noun');

class Things extends Text {
  data() {
    return this.list.map((ts) => {
      return ts.data();
    });
  }
  static find(r, n) {
    r = r.clauses();
    //find people/places/organizations
    let yup = r.people();
    yup.concat(r.places());
    yup.concat(r.organizations());
    //return them to normal ordering
    yup.sort('chronological');
    // yup.unique() //? not sure
    if (typeof n === 'number') {
      yup = yup.get(n);
    }
    return yup;
  }
}

module.exports = Things;
