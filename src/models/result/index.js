'use strict';
const chalk = require('chalk');
const Terms = require('./terms');

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
  let list = [];
  this.list.forEach((ts) => {
    //an array of arrays
    let matches = ts.match(reg, this.context);
    matches.forEach((ms) => {
      list.push(new Terms(ms));
    });
  });
  return new Result(list);
};
/** like .match(), but negative (filter-out the matches)*/
Result.prototype.remove = function(reg) {
  let list = [];
  this.list.forEach((ts) => {
    let matches = ts.remove(reg, this.context);
    if (matches) {
      list.push(matches);
    }
  });
  return new Result(list, this.context);
};

module.exports = Result;

//apply methods
// require('./methods').addMethods(Result);
