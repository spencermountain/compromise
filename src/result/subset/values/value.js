'use strict';
const paths = require('../../paths');
const Terms = paths.Terms;
const parse = require('./parse');
const fmt = require('./format');

const Value = function(arr, lexicon, refText, refTerms) {
  Terms.call(this, arr, lexicon, refText, refTerms);
  this.val = this.match('#Value+').list[0];
  this.unit = this.match('#Unit$').list[0];
};
//Terms inheritence
Value.prototype = Object.create(Terms.prototype);

const methods = {
  data: function() {
    let num = parse(this.val);
    return {
      number: num,
      nice: fmt.nice(num),
      ordinal: fmt.ordinal(num),
      niceOrdinal: fmt.niceOrdinal(num),
      text: fmt.text(num),
      textOrdinal: fmt.textOrdinal(num)
    };
  },
  number: function() {
    return parse(this.val);
  },
  // /** five -> '5' */
  toNumber: function() {
    let num = parse(this.val);
    if (num !== null) {
      let str = '';
      if (this.val.has('#Ordinal')) {
        str = fmt.ordinal(num);
      } else {
        str = num;
      }
      this.replaceWith(str, 'Value');
    }
    return this;
  },
  // /**5 -> 'five' */
  toText: function() {
    let num = parse(this.val);
    if (num !== null) {
      let str = '';
      if (this.val.has('#Ordinal')) {
        str = fmt.textOrdinal(num);
      } else {
        str = fmt.text(num);
      }
      this.replaceWith(str, 'Value');
    }
    return this;
  },
  //
  // /**5th -> 5 */
  toCardinal: function() {
    let num = parse(this.val);
    if (num !== null) {
      let str = '';
      if (this.val.has('#TextValue')) {
        str = fmt.text(num);
      } else {
        str = num;
      }
      this.replaceWith(str, 'Value');
    }
    return this;
  },
  //
  // /**5 -> 5th */
  toOrdinal: function() {
    let num = parse(this.val);
    if (num !== null) {
      let str = '';
      if (this.val.has('#TextValue')) {
        str = fmt.textOrdinal(num);
      } else {
        str = fmt.ordinal(num);
      }
      this.replaceWith(str, 'Value');
    }
    return this;
  },
  //
  // /**5900 -> 5,900 */
  toNice: function() {
    let num = parse(this.val);
    if (num !== null) {
      let str = '';
      if (this.val.has('#Ordinal')) {
        str = fmt.niceOrdinal(num);
      } else {
        str = fmt.nice(num);
      }
      this.replaceWith(str, 'Value');
    }
    return this;
  }
};


Object.keys(methods).forEach((k) => {
  Value.prototype[k] = methods[k];
});
module.exports = Value;
