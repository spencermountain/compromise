'use strict';
const parseText = require('./parseText');
// 2.5, $5.50, 3,432, etc -
const numeric = /^-?(\$|€|¥|£)?\.?[0-9]+[0-9,\.]*(st|nd|rd|th|rth|%)?$/;

const parseString = function(str) {
  if (numeric.test(str) === true) {
    //clean up a number, like '$4,342.00'
    str = str.replace(/,/g, '');
    str = str.replace(/^[\$|€|¥|£]/g, '');
    str = str.replace(/%$/, '');
    str = str.replace(/(st|nd|rd|th|rth)$/g, '');
    let num = parseFloat(str);
    if (num || num === 0) {
      return num;
    }
  }
  return parseText(str);
};

//turn it all into a number
const parse = function(val) {
  if (val === null || val === undefined || typeof val === 'number') {
    return val;
  }
  if (typeof val === 'string') {
    return parseString(val);
  }
  //numerical values can only be one term
  if (val.terms.length === 1 && val.terms[0].tags.TextValue !== true) {
    let str = val.terms[0].normal;
    return parseString(str);
  }
  return parseText(val.out('normal'));
};
module.exports = parse;
