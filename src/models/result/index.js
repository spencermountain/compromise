'use strict';
const chalk = require('chalk');
const find = require('./find');
const Terms = require('./terms');
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
    // arr[i].forEach((t) => {
    //   t.render('pretty');
    // });
    }
  }
  plaintext() {
    let arr = this.arr;
    let str = '';
    for(let i = 0; i < arr.length; i++) {
      for(let o = 0; o < arr[i].length; o++) {
        let t = arr[i].get(o);
        str += t.plaintext();
      }
    }
    return str;
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



module.exports = Result;
require('./addMethods');

//apply methods
// require('./methods').addMethods(Result);
