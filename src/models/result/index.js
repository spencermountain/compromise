'use strict';
const chalk = require('chalk');
const find = require('./find');

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

Result.prototype.find = function(reg) {
  let arr = [];
  for(let i = 0; i < this.list.length; i++) {
    let ms = find(this.list[i], reg);
    for(let i = 0; i < ms.length; i++) {
      arr.push(ms[i]);
    }
  }
  return new Result(arr);
};

module.exports = Result;

//apply methods
// require('./methods').addMethods(Result);
