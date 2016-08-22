'use strict';
const chalk = require('chalk');
//like a termList, but an array of termLists

class Result {
  constructor() {
    this.matches = [];
  }
  count() {
    return this.matches.length;
  }
  first() {
    return this.matches[0];
  }
  last() {
    return this.matches[this.matches.length - 1];
  }
  pretty() {
    let matches = this.matches;
    for(let i = 0; i < matches.length; i++) {
      let m = matches[i];
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
