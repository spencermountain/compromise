'use strict';
const irregulars = require('./paths').data.irregular_verbs;

const checkIrregulars = function(str) {
  let keys = Object.keys(irregulars);
  for(let i = 0; i < keys.length; i++) {
    let obj = irregulars[keys[i]];

    //matched infinitive
    if (keys[i] === str) {
      obj = Object.assign({}, obj);
      obj.infinitive = keys[i];
      return obj;
    }

    //check other forms
    let kinds = Object.keys(obj);
    for(let o = 0; o < kinds.length; o++) {
      if (obj[kinds[o]] === str) {
        obj = Object.assign({}, obj);
        obj.infinitive = keys[i];
        return obj;
      }
    }

  }
  return null;
};

module.exports = checkIrregulars;
// console.log(checkIrregulars('understood'));
