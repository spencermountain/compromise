'use strict';
const chalk = require('chalk');
const Terms = require('./terms');
const info = require('./info');
const render = require('./render');

//a result is an array of termLists
class Result {
  constructor(arr) {
    this.list = arr || [];
  }
  /** did it find anything? */
  get found() {
    return this.list.length > 0;
  }
}

//add methods to prototype
const methods = require('./methods');
Object.keys(methods).forEach((k) => {
  Result = methods[k](Result);
});

/** do a regex-like search through terms and return a subset */
Result.prototype.match = function(reg, quiet) {
  let list = [];
  this.list.forEach((ts) => {
    //an array of arrays
    let matches = ts.match(reg, quiet);
    matches.forEach((ms) => {
      list.push(new Terms(ms));
    });
  });
  return new Result(list);
};
/** return terms after this match */
Result.prototype.after = function(reg) {
  let after = reg + ' *';
  return this.match(after).remove(reg);
};
/** return terms before this match */
Result.prototype.before = function(reg) {
  let before = '* ' + reg;
  return this.match(before).remove(reg);
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
/** return ad-hoc data about this result*/
Result.prototype.info = info;
/** different presentation logic for this result*/
Result.prototype.render = render;

module.exports = Result;

//apply methods
// require('./methods').addMethods(Result);
