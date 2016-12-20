'use strict';
const parseNumeric = require('./parseNumeric');
const findModifiers = require('./findModifiers');
const words = require('./data');
const isValid = require('./validate');
const parseDecimals = require('./parseDecimals');
const log = require('../paths').log;
const path = 'parseNumber';

//some numbers we know
const casualForms = {
  // 'a few': 3,
  'a couple': 2,
  'a dozen': 12,
  'two dozen': 24,
  'zero': 0,
};

// a 'section' is something like 'fifty-nine thousand'
// turn a section into something we can add to - like 59000
const section_sum = (obj) => {
  // console.log(obj);
  return Object.keys(obj).reduce((sum, k) => {
    sum += obj[k];
    return sum;
  }, 0);
};

const alreadyNumber = (ts) => {
  for(let i = 0; i < ts.terms.length; i++) {
    if (!ts.terms[i].tag.NumericValue) {
      return false;
    }
  }
  return true;
};

//turn a string into a number
const parse = function(ts) {
  log.here('parseNumber', path);
  let str = ts.normal();

  //convert some known-numbers
  if (casualForms[str] !== undefined) {
    return casualForms[str];
  }
  //'a/an' is 1
  if (str === 'a' || str === 'an') {
    return 1;
  }
  //handle a string of mostly numbers
  if (alreadyNumber(ts)) {
    return parseNumeric(ts.normal());
  }
  let modifier = findModifiers(str);
  str = modifier.str;
  let last_mult = null;
  let has = {};
  let sum = 0;
  let isNegative = false;
  let terms = str.split(/[ -]/);
  // console.log(terms);
  for (let i = 0; i < terms.length; i++) {
    let w = terms[i];
    // console.log(i + '  - ' + w);
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
      log.tell('invalid state', path);
      log.tell(has, path);
      return null;
    }
    //buildup section, collect 'has' values
    if (w.match(/^[0-9\.]+$/)) {
      has['ones'] = parseFloat(w, 10); //not technically right
    } else if (words.ones[w]) {
      has['ones'] = words.ones[w];
    } else if (words.teens[w]) {
      has['teens'] = words.teens[w];
    } else if (words.tens[w]) {
      has['tens'] = words.tens[w];
    } else if (words.multiples[w]) {
      let mult = words.multiples[w];
      //something has gone wrong : 'two hundred five hundred'
      if (mult === last_mult) {
        log.tell('invalid multiplier', path);
        return null;
      }
      //support 'hundred thousand'
      //this one is tricky..
      if (mult === 100 && terms[i + 1]) {
        // has['hundreds']=
        var w2 = terms[i + 1];
        if (words.multiples[w2]) {
          mult *= words.multiples[w2]; //hundredThousand/hundredMillion
          i += 1;
        }
      }
      //natural order of things
      //five thousand, one hundred..
      if (last_mult === null || mult < last_mult) {
        sum += (section_sum(has) || 1) * mult;
        last_mult = mult;
        has = {};
      } else {
        //maybe hundred .. thousand
        sum += section_sum(has);
        last_mult = mult;
        sum = (sum || 1) * mult;
        has = {};
      }
    }
  }
  //dump the remaining has values
  sum += section_sum(has);
  //post-process add modifier
  sum *= modifier.amount;
  sum *= isNegative ? -1 : 1;
  //dont return 0, if it went straight-through
  if (sum === 0) {
    return null;
  }
  return sum;
};

module.exports = parse;
