'use strict';
// Spoken numbers take the following format
// [sixty five] (thousand) [sixty five] (hundred) [sixty five]
// aka: [one/teen/ten] (multiple) [one/teen/ten] (multiple) ...
const nums = require('../../../../data/numbers.js');
const find_modifiers = require('./modifiers.js');
const parse_decimals = require('./decimals.js');

const ones = Object.assign({}, nums.ones, nums.ordinal_ones);
const teens = Object.assign({}, nums.teens, nums.ordinal_teens);
const tens = Object.assign({}, nums.tens, nums.ordinal_tens);
const multiples = Object.assign({}, nums.multiples, nums.ordinal_multiples);


const normalize = (s) => {
  //pretty-printed numbers
  s = s.replace(/, ?/g, '');
  //parse-out currency
  s = s.replace(/[$£€]/, '');
  s = s.replace(/[\$%\(\)~,]/g, '');
  s = s.trim();
  return s;
};

const section_sum = (obj) => {
  return Object.keys(obj).reduce((sum, k) => {
    sum += obj[k];
    return sum;
  }, 0);
};

//prevent things like 'fifteen ten', and 'five sixty'
const appropriate = (w, has) => {
  if (ones[w]) {
    if (has.ones || has.teens) {
      return false;
    }
  } else if (teens[w]) {
    if (has.ones || has.teens || has.tens) {
      return false;
    }
  } else if (tens[w]) {
    if (has.ones || has.teens || has.tens) {
      return false;
    }
  }
  return true;
};

const to_number = function(str) {
  //try to fail-fast
  if (!str || typeof str === 'number') {
    return str;
  }
  str = normalize(str);
  let modifier = find_modifiers(str);
  str = modifier.str;
  let biggest_yet = 0;
  let has = {};
  let sum = 0;

  let words = str.split(' ');
  for(let i = 0; i < words.length; i++) {
    let w = words[i];
    if (!w || w === 'and') {
      continue;
    }
    //decimal mode
    if (w === 'point') {
      sum += section_sum(has);
      sum += parse_decimals(words.slice(i + 1, words.length));
      return sum;
    }
    //maybe it's just a number typed as a string
    if (w.match(/^[0-9,\. ]+$/)) {
      sum += parseFloat(w.replace(/[, ]/g, '')) || 0;
      continue;
    }
    //prevent mismatched units, like 'seven eleven'
    if (!appropriate(w, has)) {
      return null;
    }
    //collect 'has' values
    if (ones[w]) {
      has['ones'] = ones[w];
    } else if (teens[w]) {
      has['teens'] = teens[w];
    } else if (tens[w]) {
      has['tens'] = tens[w];
    } else if (multiples[w]) {
      //something has gone wrong : 'two hundred five hundred'
      if (multiples[w] === biggest_yet) {
        return null;
      }
      //if it's the biggest yet, multiply the whole sum - eg 'five hundred thousand'
      if (multiples[w] > biggest_yet) {
        biggest_yet = multiples[w];
        sum += section_sum(has);
        sum = (sum || 1) * multiples[w];
      } else {
        //it's smaller, so only multiply section_sum - eg 'five thousand one hundred'
        sum += (section_sum(has) || 1) * multiples[w];
      }
      //reset our section
      has = {};
    }
  }
  //dump the remaining has values
  sum += section_sum(has);
  //post-process add modifier
  sum *= modifier.amount;
  return sum;
};

module.exports = to_number;

// console.log(to_number(' twelve one'));
