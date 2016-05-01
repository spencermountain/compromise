'use strict';
// const nums = require('../../../data/numbers.js');
// const fns = require('../../../fns.js');

const ones_mapping = [
  '',
  'one',
  'two',
  'three',
  'four',
  'five',
  'six',
  'seven',
  'eight',
  'nine',
  'ten',
  'eleven',
  'twelve',
  'thirteen',
  'fourteen',
  'fifteen',
  'sixteen',
  'seventeen',
  'eighteen',
  'nineteen',
];
const tens_mapping = [
  ['ninety', 90],
  ['eighty', 80],
  ['seventy', 70],
  ['sixty', 60],
  ['fifty', 50],
  ['forty', 40],
  ['thirty', 30],
  ['twenty', 20],
];

let sequence = [
  [1000000000, 'million'],
  [100000000, 'hundred million'],
  [1000000, 'million'],
  [100000, 'hundred thousand'],
  [1000, 'thousand'],
  [100, 'hundred'],
  [1, 'one'],
];

//turn number into an array of magnitudes
const breakdown_magnitudes = function(num) {
  let working = num;
  let have = [];
  sequence.forEach((a) => {
    if (num > a[0]) {
      let howmany = Math.floor(working / a[0]);
      working -= howmany * a[0];
      if (howmany) {
        have.push({
          unit: a[1],
          count: howmany
        });
      }
    }
  });
  return have;
};

//turn numbers from 100-0 into their text
const breakdown_hundred = function(num) {
  let str = '';
  for(let i = 0; i < tens_mapping.length; i++) {
    if (num >= tens_mapping[i][1]) {
      num -= tens_mapping[i][1];
      str += ' ' + tens_mapping[i][0];
    }
  }
  //(hopefully) we should only have 20-0 now
  if (ones_mapping[num]) {
    str += ' ' + ones_mapping[num];
  }
  return str.trim();
};


const to_text = function(num) {
  let isNegative = false;
  if (num < 0) {
    isNegative = true;
    num = Math.abs(num);
  }
  //break-down into units, counts
  let units = breakdown_magnitudes(num);
  //build-up the string from its components
  let str = '';
  for(let i = 0; i < units.length; i++) {
    let unit_name = units[i].unit;
    if (unit_name === 'one') {
      unit_name = '';
      //put an 'and' in here
      if (str.length > 1) {
        str += ' and';
      }
    }
    str += ' ' + breakdown_hundred(units[i].count) + ' ' + unit_name;
  }
  str = str || 'zero';
  str = str.replace(/ +/g, ' ');
  str = str.trim();
  if (isNegative) {
    str = 'negative ' + str;
  }
  return str;
};

module.exports = to_text;

// console.log(to_text(-5));
