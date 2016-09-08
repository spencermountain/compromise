'use strict';
const chalk = require('chalk');

//a result is an array of termLists
class Result {
  constructor(arr) {
    this.list = arr || [];
  }
}
//add methods to prototype
const methods = require('./methods');
Object.keys(methods).forEach((k) => {
  Result = methods[k](Result);
});

/** do a regex-like search through terms and return a subset */
Result.prototype.match = function(reg) {
  let list = this.list.map((ts) => {
    return ts.match(reg, this.context);
  });
  return new Result(arr);
};
/** like .match(), but negative (filter-out the matches)*/
Result.prototype.remove = function(reg) {
  console.log(this);
  // let list = this.list.map((ts) => {
  //   let foundTerms = find(ts, reg);
  //   // ts.terms = ts.terms.filter((t) => {
  //   //   console.log(t.indexOf(foundTerms));
  //   //   return t.indexOf(foundTerms) === -1;
  //   // });
  //   return ts;
  // });
  return new Result([], this.context);
};

module.exports = Result;

//apply methods
// require('./methods').addMethods(Result);
