'use strict';
const paths = require('../../paths');
const Terms = paths.Terms;
const parse = require('./parse');

const Value = function(arr, lexicon, refText, refTerms) {
  Terms.call(this, arr, lexicon, refText, refTerms);
  this.val = this.match('#Value+').list[0];
  this.unit = this.match('#Unit$').list[0];
};
//Terms inheritence
Value.prototype = Object.create(Terms.prototype);

const methods = {
  number: function() {
    return parse(this.val);
  },
// /** five -> '5' */
// toNumber: function() {
//   let num = this.number();
//   if (num !== null) {
//     this.replaceWith('' + num, 'Value');
//   }
//   return this;
// },
// /**5 -> 'five' */
// toTextValue: function() {
//   let val = this.val;
//   //is already
//   if (isText(val)) {
//     return this;
//   }
//   //otherwise, parse it
//   if (isOrdinal(val)) {
//     let str = textOrdinal(val);
//     return this.replaceWith(str, 'Value');
//   }
//   let num = '' + parse(val);
//   let str = toText(num).join(' ');
//   this.replaceWith(str, 'Value');
//   return this;
// },
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
// data: function() {
//   let numV = this.clone().toNumber();
//   let txtV = this.clone().toTextValue();
//   let obj = {
//     NumericValue: {
//       cardinal: numV.toCardinal().out('text'),
//       ordinal: numV.toOrdinal().out('text'),
//       nicenumber: this.toNiceNumber().out('text'),
//     },
//     TextValue : {
//       cardinal: txtV.toCardinal().out('text'),
//       ordinal: txtV.toOrdinal().out('text'),
//     },
//     unit: ''
//   };
//   if (this.unit) {
//     obj.unit = this.unit.out('text');
//   }
//   obj.number = this.number();
//   return obj;
// },
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
