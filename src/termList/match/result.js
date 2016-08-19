'use strict';
//like a termList, but an array of termLists
class Result {
  constructor() {
    this.matches = [];
  }

  pretty() {
    let matches = this.matches;
    for(let i = 0; i < matches.length; i++) {
      let m = matches[i];
      console.log('------');
      for(let o = 0; o < m.length; o++) {
        console.log('   ' + m.arr[o].normal);
      }
    }
  }
}
module.exports = Result;
