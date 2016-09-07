'use strict';
const chalk = require('chalk');
const find = require('./find');
const Terms = require('./terms');
//an array of termLists
class Result {
  constructor(arr) {
    this.list = arr || [];
  }
}

const methods = require('./methods');
Object.keys(methods).forEach((k) => {
  console.log(k);
  Result = methods[k](Result);
});

// Result.prototype.find = (reg) => {
//   let arr = [];
//   for(let i = 0; i < this.list.length; i++) {
//     let ms = find(this.list[i], reg);
//     for(let i = 0; i < ms.length; i++) {
//       arr.push(ms[i]);
//     }
//   }
//   return new Result(arr);
// };

module.exports = Result;

//apply methods
// require('./methods').addMethods(Result);
