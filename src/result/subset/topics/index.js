'use strict';
const Text = require('../../index');

//the Topics() subset class
const methods = {};

const find = function(r, n) {
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
};

module.exports = Text.makeSubset(methods, find);
