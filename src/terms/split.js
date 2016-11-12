'use strict';

//break apart a termlist logic, for reuse
const breakIntoThree = (ts, ms) => {
  let findFirst = ms.terms[0]
  let len = ms.terms.length
  let result = {
    before: [],
    match: [],
    after: [],
  }
  for (let i = 0; i < ts.terms.length; i++) {
    //match the term ref
    if (ts.terms[i] === findFirst) {
      console.log(ts.terms[i].normal)
      result.before = ts.terms.slice(0, i)
      result.match = ts.terms.slice(i, i + len)
      result.after = ts.terms.slice(i + len, ts.terms.length)
      return result
    }
  }
  return result
}

const splitMethods = (Terms) => {

  const methods = {

    splitAfter: function(reg, verbose) {
      let arr = this.match(reg, verbose); //returns an array of ts
      let all = []
      arr.forEach((ms) => {
        let result = breakIntoThree(this, ms)
        all.push(result.before.concat(result.match))
        all.push(result.after)
      });
      return all;
    },

  }

  //hook them into result.proto
  Object.keys(methods).forEach((k) => {
    Terms.prototype[k] = methods[k];
  });
  return Terms;
};

module.exports = splitMethods;
exports = splitMethods;
