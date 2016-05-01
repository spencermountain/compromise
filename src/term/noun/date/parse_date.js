'use strict';
// #generates properly-formatted dates from free-text date forms
// #by spencer kelly 2015
const to_number = require('../value/parse/to_number.js');
//regexes to top-parse
const rules = require('./date_rules.js');

//return integers from strings
let wrangle = {

  year: function(s) {
    let num = s.match(/[0-9]+/);
    num = parseInt(num, 10);
    if (!num || num > 2900 || num < 0) {
      return null;
    }
    //honestly, prob not a year either
    if (num > 100 && num < 1000) {
      return null;
    }
    //'20BC' becomes -20
    if (s.match(/[0-9] ?bc/i)) {
      return num *= -1;
    }
    // '98 becomes 1998
    if (num < 100 && num > 30) {
      num += 1900;
    }
    return num;
  },

  month: function(s) {
    //0 based months, 1 based days...
    let months_obj = {
      january: 0,
      february: 1,
      march: 2,
      april: 3,
      may: 4,
      june: 5,
      july: 6,
      august: 7,
      september: 8,
      october: 9,
      november: 10,
      december: 11,
      jan: 0,
      feb: 1,
      mar: 2,
      apr: 3,
      aug: 7,
      sept: 8,
      oct: 9,
      nov: 10,
      dec: 11
    };
    return months_obj[s];
  },

  day: function(s) {
    let n = to_number(s) || parseInt(s, 10);
    if (n < 0 || n > 31) {
      return null;
    }
    return n;
  }
};

//cleanup string
const preprocess = function(str) {
  str = str.toLowerCase();
  str = str.replace(/([0-9]+)(nd|rd|th|st)/i, '$1');
  let words = str.split(' ').map(function(w) {
    if (!w.match(/[0-9]/)) {
      return to_number(w) || w;
    }
    return w;
  });
  return words.join(' ');
};

const date_parser = function(str) {
  str = preprocess(str);
  let result = {
    year: null,
    month: null,
    day: null
  };
  for(let i = 0; i < rules.length; i++) {
    if (str.match(rules[i].reg)) {
      let m = str.match(rules[i].reg);
      for(let o = 0; o < rules[i].order.length; o++) {
        let type = rules[i].order[o];
        result[type] = wrangle[type](m[o + 1]);
      }
      break;
    }
  }
  return result;
};
module.exports = date_parser;
// console.log(wrangle.year('1998'));
// console.log(date_parser('March 1st 1987'));
// console.log(date_extractor('june second 1999'));
