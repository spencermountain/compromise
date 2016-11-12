'use strict';
const matchTerms = require('./match');

//
const breakHere = (ts, term, isAfter) => {
  for (let i = 0; i < ts.terms.length; i++) {
    let t = ts.terms[i];
    if (t === term) {
      let len = ts.terms.length;
      //split after this term
      let before = ts.terms.slice(i, len);
      let after = ts.terms.slice(i, len);
      if (before.length === 0) {
        return [after];
      }
      return [before, after];
    }
  }
  return [ts, terns];
};


const splitMethods = (Terms) => {

  const methods = {

    splitAfter: function(reg, verbose) {
      let all = [];
      let ms = matchTerms(this, reg, verbose); //returns an array of matches
      ms.forEach((match) => {
        let endTerm = match[match.length - 1];
        let arr = splitHere(this, endTerm, true);
        // console.log(arr);
        arr.forEach((a) => {
          all.push(a);
        });
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
