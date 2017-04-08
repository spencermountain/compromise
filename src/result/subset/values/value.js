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
      nice: fmt.number.nice(num),
      ordinal: fmt.number.ordinal(num),
      niceOrdinal: fmt.number.niceOrdinal(num),
      text: fmt.text.cardinal(num),
      textOrdinal: fmt.text.ordinal(num)
    };
  },
  number: function() {
    return parse(this.val);
  },
  // /** five -> '5' */
  toNumber: function() {
    let num = parse(this.val);
    if (num !== null) {
      this.replaceWith('' + num, 'Value');
    }
    return this;
  },
  // /**5 -> 'five' */
  toTextValue: function() {
    let num = parse(this.val);
    if (num !== null) {
      let str = '';
      if (this.val.has('#Ordinal')) {
        str = format.textOrdinal(num);
      } else {
        str = format.textValue(num);
      }
      this.replaceWith(str, 'Value');
    }
    return this;
  },
//
// /**5th -> 5 */
// toCardinal: function() {
//   let val = this.val;
//   //already
//   if (!isOrdinal(val)) {
//     return this;
//   }
//   //otherwise,
//   if (isText(val)) {
//     let num = '' + parse(val);
//     let str = toText(num).join(' ');
//     return this.replaceWith(str, 'Value');
//   }
//   let num = '' + parse(val);
//   return this.replaceWith(num, 'Value');
// },
//
// /**5 -> 5th */
// toOrdinal: function() {
//   let val = this.val;
//   //already
//   if (isOrdinal(val)) {
//     return this;
//   }
//   //otherwise,
//   if (isText(val)) {
//     let str = textOrdinal(val);
//     this.replaceWith(str, 'Value');
//   } else {
//     //number-ordinal
//     let str = numOrdinal(val);
//     this.replaceWith(str, 'Value');
//   }
//   return this;
// },
//
// /**5900 -> 5,900 */
// toNiceNumber: function() {
//   let num = parse(this);
//   let str = toNiceNumber(num);
//   this.replaceWith(str, 'Value');
//   return this;
// },
//
// clone : function() {
//   let terms = this.terms.map((t) => {
//     return t.clone();
//   });
//   return new Value(terms, this.lexicon, this.refText, this.refTerms);
// }
};


Object.keys(methods).forEach((k) => {
  Value.prototype[k] = methods[k];
});
module.exports = Value;
