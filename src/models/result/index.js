'use strict';
const chalk = require('chalk');
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
      let m = arr[i];
      console.log('---' + i + '---');
      let msg = '';
      m.forEach((t) => {
        msg += '\'' + t.normal + '\' ';
      });
      console.log('    ' + chalk.green('✔️  ') + chalk.underline(chalk.green(msg)));
    }
  }
}
module.exports = Result;
