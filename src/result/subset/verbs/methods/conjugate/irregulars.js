'use strict';
const irregulars = require('../../../../../data').irregular_verbs; //weeee!
const fns = require('../../../../../fns'); //weeee!
const infArr = Object.keys(irregulars);
const forms = [
  'Participle',
  'Gerund',
  'PastTense',
  'PresentTense',
  'FuturePerfect',
  'PerfectTense',
  'Actor'
];

const checkIrregulars = function(str) {
  //fast infinitive lookup
  if (irregulars[str] !== undefined) {
    let obj = fns.copy(irregulars[str]);
    obj.Infinitive = str;
    return obj;
  }
  //longer check of known-verb forms
  for(let i = 0; i < infArr.length; i++) {
    for(let o = 0; o < forms.length; o++) {
      let irObj = irregulars[infArr[i]];
      if (irObj[forms[o]] === str) {
        let obj = fns.copy(irObj);
        obj.Infinitive = infArr[i];
        return obj;
      }
    }
  }
  return {};
};

module.exports = checkIrregulars;
// console.log(checkIrregulars('bit'));
