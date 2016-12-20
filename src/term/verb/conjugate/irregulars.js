'use strict';
const irregulars = require('./paths').data.irregular_verbs;
const Irregs = Object.keys(irregulars);

const checkIrregulars = function(str) {
  for(let i = 0; i < Irregs.length; i++) {
    let obj = irregulars[Irregs[i]];
    //matched infinitive
    if (Irregs[i] === str) {
      obj = Object.assign({}, obj);
      obj.Infinitive = Irregs[i];
      return obj;
    }
    //check other forms
    let kinds = Object.keys(obj);
    for(let o = 0; o < kinds.length; o++) {
      if (obj[kinds[o]] === str) {
        obj = Object.assign({}, obj);
        obj.Infinitive = Irregs[i];
        return obj;
      }
    }
  }
  return {};
};

module.exports = checkIrregulars;
// console.log(checkIrregulars('understood'));
