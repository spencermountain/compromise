// converts spoken numbers into integers  "fifty seven point eight" -> 57.8
//
// Spoken numbers take the following format
// [sixty five] (thousand) [sixty five] (hundred) [sixty five]
// aka: [one/teen/ten] (multiple) [one/teen/ten] (multiple) ...
// combile the [one/teen/ten]s as 'current_sum', then multiply it by its following multiple
// multiple not repeat

'use strict';
const nums = require('./numbers.js');
//these sets of numbers each have different rules
//[tenth, hundreth, thousandth..] are ambiguous because they could be ordinal like fifth, or decimal like one-one-hundredth, so are ignored
// let decimal_multiple={'tenth':0.1, 'hundredth':0.01, 'thousandth':0.001, 'millionth':0.000001,'billionth':0.000000001};


//test for nearly-values, like phonenumbers, or whatever
const is_number = function(s) {
  //phone numbers, etc
  if (s.match(/[:@]/)) {
    return false;
  }
  //if there's a number, then something, then a number
  if (s.match(/[0-9][^0-9,\.][0-9]/)) {
    return false;
  }
  return true;
};

//try the best to turn this into a integer/float
const to_number = function(s) {
  if (s === null || s === undefined) {
    return null;
  }
  //if it's already a number,
  if (typeof s === 'number') {
    return s;
  }
  //remove symbols, commas, etc
  if (is_number(s) !== true) {
    return null;
  }
  s = s.replace(/[\$%\(\)~,]/g, '');
  s = s.trim();
  //if it's a number-as-string
  if (s.match(/^[0-9\.\-]+$/)) {
    return parseFloat(s);
  }
  //remember these concerns for possible errors
  let ones_done = false;
  let teens_done = false;
  let tens_done = false;
  const multiple_done = {};
  let total = 0;
  let global_multiplier = 1;
  //pretty-printed numbers
  s = s.replace(/, ?/g, '');
  //parse-out currency
  s = s.replace(/[$£€]/, '');
  //try to die fast. (phone numbers or times)
  if (s.match(/[0-9][\-:][0-9]/)) {
    return null;
  }
  //support global multipliers, like 'half-million' by doing 'million' then multiplying by 0.5
  const mults = [{
    reg: /^(minus|negative)[\s\-]/i,
    mult: -1
  }, {
    reg: /^(a\s)?half[\s\-](of\s)?/i,
    mult: 0.5
  }, {
    reg: /^(a\s)?quarter[\s\-]/i,
    mult: 0.25
  }];
  for (let i = 0; i < mults.length; i++) {
    if (s.match(mults[i].reg)) {
      global_multiplier = mults[i].mult;
      s = s.replace(mults[i].reg, '');
      break;
    }
  }

  //do each word in turn..
  const words = s.toString().split(/[\s\-]+/);
  let w, x;
  let current_sum = 0;
  let local_multiplier = 1;
  let decimal_mode = false;
  for (let i = 0; i < words.length; i++) {
    w = words[i];

    //skip 'and' eg. five hundred and twelve
    if (w === 'and') {
      continue;
    }

    //..we're doing decimals now
    if (w === 'point' || w === 'decimal') {
      if (decimal_mode) {
        return null;
      } //two point one point six
      decimal_mode = true;
      total += current_sum;
      current_sum = 0;
      ones_done = false;
      local_multiplier = 0.1;
      continue;
    }

    //handle special rules following a decimal
    if (decimal_mode) {
      x = null;
      //allow consecutive ones in decimals eg. 'two point zero five nine'
      if (nums.ones[w] !== undefined) {
        x = nums.ones[w];
      }
      if (nums.teens[w] !== undefined) {
        x = nums.teens[w];
      }
      if (parseInt(w, 10) === w) {
        x = parseInt(w, 10);
      }
      if (!x) {
        return null;
      }
      if (x < 10) {
        total += x * local_multiplier;
        local_multiplier = local_multiplier * 0.1; // next number is next decimal place
        current_sum = 0;
        continue;
      }
      //two-digit decimals eg. 'two point sixteen'
      if (x < 100) {
        total += x * (local_multiplier * 0.1);
        local_multiplier = local_multiplier * 0.01; // next number is next decimal place
        current_sum = 0;
        continue;
      }
    }

    //if it's already an actual number
    if (w.match(/^[0-9\.]+$/)) {
      current_sum += parseFloat(w);
      continue;
    }
    if (parseInt(w, 10) === w) {
      current_sum += parseInt(w, 10);
      continue;
    }
    //ones rules
    if (nums.ones[w] !== undefined) {
      if (ones_done) {
        return null;
      } // eg. five seven
      if (teens_done) {
        return null;
      } // eg. five seventeen
      ones_done = true;
      current_sum += nums.ones[w];
      continue;
    }
    //teens rules
    if (nums.teens[w]) {
      if (ones_done) {
        return null;
      } // eg. five seventeen
      if (teens_done) {
        return null;
      } // eg. fifteen seventeen
      if (tens_done) {
        return null;
      } // eg. sixty fifteen
      teens_done = true;
      current_sum += nums.teens[w];
      continue;
    }
    //tens rules
    if (nums.tens[w]) {
      if (ones_done) {
        return null;
      } // eg. five seventy
      if (teens_done) {
        return null;
      } // eg. fiveteen seventy
      if (tens_done) {
        return null;
      } // eg. twenty seventy
      tens_done = true;
      current_sum += nums.tens[w];
      continue;
    }
    //multiple rules
    if (nums.multiples[w]) {
      if (multiple_done[w]) {
        return null;
      } // eg. five hundred six hundred
      multiple_done[w] = true;
      //reset our concerns. allow 'five hundred five'
      ones_done = false;
      teens_done = false;
      tens_done = false;
      //case of 'hundred million', (2 consecutive multipliers)
      if (current_sum === 0) {
        total = total || 1; //dont ever multiply by 0
        total *= nums.multiples[w];
      } else {
        current_sum *= nums.multiples[w];
        total += current_sum;
      }
      current_sum = 0;
      continue;
    }
    //if word is not a known thing now, die
    return null;
  }
  if (current_sum) {
    total += (current_sum || 1) * local_multiplier;
  }
  //combine with global multiplier, like 'minus' or 'half'
  total = total * global_multiplier;

  return total;
};

// console.log(to_number('minus five hundred'));
// console.log(to_number("a hundred"))
// console.log(to_number('four point six'));

//kick it into module
module.exports = to_number;
