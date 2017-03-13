'use strict';
const Text = require('../../index');

class Things extends Text {
  static find(r, n) {
    r = r.clauses();
    //find people, places, and organizations
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
