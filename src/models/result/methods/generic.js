'use strict';
//
const genericMethods = (Result) => {

  Result.prototype.count = function() {
    return this.list.length;
  };

  //
  Result.prototype.pretty = function() {
    let list = this.list;
    for(let i = 0; i < list.length; i++) {
      // arr[i].pretty();
      console.log('-' + i + '-');
      list[i].forEach((t) => {
        t.render('pretty');
      });
    }
  };
  //

  Result.prototype.plaintext = function() {
    let arr = this.list;
    let str = '';
    for(let i = 0; i < arr.length; i++) {
      for(let o = 0; o < arr[i].length; o++) {
        let t = arr[i].get(o);
        str += t.plaintext();
      }
    }
    return str;
  },

  Result.prototype.first = function(n) {
    return new Result([this.list[0]], this.context);
  };
  Result.prototype.last = function(n) {
    let lastOne = this.list[this.list.length - 1];
    return new Result([lastOne], this.context);
  };
  return Result;
};

module.exports = genericMethods;
