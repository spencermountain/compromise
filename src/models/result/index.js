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
  first() {
    return this.arr[0];
  }
  last() {
    return this.arr[this.arr.length - 1];
  }
  pretty() {
    let arr = this.arr;
    for(let i = 0; i < arr.length; i++) {
      arr[i].pretty();
    }
  }
}
Result.prototype.find = function(reg) {
  let arr = this.arr.map((ts) => {
    return find(ts, reg)[0]; //fixme
  });
  return new Result(arr);
};
module.exports = Result;
