'use strict';
const chalk = require('chalk');
const find = require('./find');
const TermList = require('../termList');
//like a termList, but an array of termLists

class Result {
  constructor(arr) {
    this.arr = arr || [];
  }
  count() {
    return this.arr.length;
  }
  pretty() {
    let arr = this.arr;
    for(let i = 0; i < arr.length; i++) {
      arr[i].pretty();
    }
  }
}

Result.prototype.find = function(reg) {
  let arr = [];
  for(let i = 0; i < this.arr.length; i++) {
    let ms = find(this.arr[i], reg);
    for(let i = 0; i < ms.length; i++) {
      arr.push(ms[i]);
    }
  }
  return new Result(arr);
};
//apply methods
require('../methods').applyResult(Result);
module.exports = Result;
