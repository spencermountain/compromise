'use strict';
const parseText = require('./parseText');
const numeric = /^(\$|€|¥|£)?[0-9\.]+[0-9,\.]*(st|nd|rd|th|rth)?$/;

//turn it all into a number
const parse = function(val) {
  //numerical values can only be one term
  if (val.terms.length === 1 && val.terms[0].tags.TextValue !== true) {
    let str = val.terms[0].normal;
    if (numeric.test(str) === true) {
      //clean up a number, like '$4,342.00'
      str = str.replace(/,/g, '');
      str = str.replace(/^[\$|€|¥|£]/g, '');
      str = str.replace(/(st|nd|rd|th|rth)$/g, '');
      let num = parseFloat(str);
      if (num || num === 0) {
        return num;
      }
    }
  }
  return parseText(val);
};
module.exports = parse;
