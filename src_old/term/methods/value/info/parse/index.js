'use strict';
const parseNumeric = require('./parseNumeric');
const findModifiers = require('./findModifiers');
const words = require('./data');
const isValid = require('./validate');
const parseDecimals = require('./parseDecimals');
const log = require('../../paths').log;
const path = 'parseNumber';

// a 'section' is something like 'fifty-nine thousand'
// turn a section into something we can add to - like 59000
const section_sum = (obj) => {
  return Object.keys(obj).reduce((sum, k) => {
    sum += obj[k];
    return sum;
  }, 0);
};

//turn a string into a number
const parse = function(t) {
  log.here('parseNumber', path);
  let str = t.normal;
  //handle a string of mostly numbers
  if (t.tag['Numeric'] || str.match(/^[0-9]+(st|nd|rd|th)?$/)) {
    return parseNumeric(str);
  }
  let modifier = findModifiers(str);
  str = modifier.str;
  let biggest_yet = 0;
  let has = {};
  let sum = 0;
  let isNegative = false;
  let terms = str.split(/[ -]/);
  for (let i = 0; i < terms.length; i++) {
    let w = terms[i];
    if (!w || w === 'and') {
      continue;
    }
    if (w === '-' || w === 'negative') {
      isNegative = true;
      continue;
    }
    if (w.startsWith('-')) {
      isNegative = true;
      w = w.substr(1);
    }
    //decimal mode
    if (w === 'point') {
      sum += section_sum(has);
      sum += parseDecimals(terms.slice(i + 1, terms.length));
      sum *= modifier.amount;
      return sum;
    }
    //improper fraction
    const improperFractionMatch = w.match(/^([0-9,\. ]+)\/([0-9,\. ]+)$/);
    if (improperFractionMatch) {
      log.here('fractionMath', path);
      const num = parseFloat(improperFractionMatch[1].replace(/[, ]/g, ''));
      const denom = parseFloat(improperFractionMatch[2].replace(/[, ]/g, ''));
      if (denom) {
        sum += (num / denom) || 0;
      }
      continue;
    }
    //prevent mismatched units, like 'seven eleven'
    if (!isValid(w, has)) {
      log.warn('invalid state', path);
      log.warn(has, path);
      return null;
    }
    //buildup section, collect 'has' values
    if (w.match(/^[0-9]$/)) {
      has['ones'] = parseInt(w, 10); //not technically right
    } else if (words.ones[w]) {
      has['ones'] = words.ones[w];
    } else if (words.teens[w]) {
      has['teens'] = words.teens[w];
    } else if (words.tens[w]) {
      has['tens'] = words.tens[w];
    } else if (words.multiples[w]) {
      let mult = words.multiples[w];
      //something has gone wrong : 'two hundred five hundred'
      if (mult === biggest_yet) {
        log.warn('invalid multiplier', path);
        return null;
      }
      //if it's the biggest yet, multiply the whole sum - eg 'five hundred thousand'
      if (mult > biggest_yet) {
        biggest_yet = mult;
        sum += section_sum(has);
        sum = (sum || 1) * mult;
      } else {
        //it's smaller, so only multiply section_sum - eg 'five thousand one hundred'
        sum += (section_sum(has) || 1) * mult;
      }
      //reset our section
      has = {};
    }
  }
  //dump the remaining has values
  sum += section_sum(has);
  //post-process add modifier
  sum *= modifier.amount;
  sum *= isNegative ? -1 : 1;
  return sum;
};

module.exports = parse;
