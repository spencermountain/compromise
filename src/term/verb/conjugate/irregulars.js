'use strict';
const irregulars = require('./paths').data.irregular_verbs;
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
    let obj = Object.assign({}, irregulars[str]);
    obj.Infinitive = str;
    return obj;
  }
  for(let i = 0; i < infArr.length; i++) {
    for(let o = 0; o < forms.length; o++) {
      let irObj = irregulars[infArr[i]];
      if (irObj[forms[o]]) {
        let obj = Object.assign({}, irObj);
        obj.Infinitive = str;
        return obj;
      }
    }
  }
  return null;
};

module.exports = checkIrregulars;
// console.log(checkIrregulars('understood'));
