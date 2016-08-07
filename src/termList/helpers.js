'use strict';
const fns = require('../fns');
//termList methods
const methods = {
  /** return unique terms and their frequencies */
  byFreq: (terms) => {
    let obj = {};
    //count repeating terms
    terms.forEach((t) => {
      obj[t.normal] = obj[t.normal] || 0;
      obj[t.normal] += 1;
    });
    let sum = fns.sum(fns.values(obj));
    //set percentage
    let result = Object.keys(obj).map((k) => {
      let percent = ((obj[k] / sum) * 100).toFixed(1);
      return {
        term: k,
        count: obj[k],
        percent: parseFloat(percent)
      };
    });
    //sort
    return result.sort((a, b) => {
      if (a.percent < b.percent) {
        return 1;
      }
      return -1;
    });
  }
};

module.exports = methods;
