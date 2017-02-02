'use strict';
// const Terms = require('../index');
// console.log(Terms.build)

let foreach = [
  'toTitleCase',
  'toUpperCase',
  'toLowerCase',
  'toCamelCase',
  'hyphenate',
  'deHyphenate',
  'insertBefore',
  'insertAfter',
  'insertAt', //i, str
  'replace',
  'replaceWith',
  'delete',
];


const addMethods = (Text) => {

  foreach.forEach((k) => {
    let myFn = function () {
      let args = arguments;
      this.list.forEach((ts) => {
        ts[k].apply(ts, args);
      });
      return this;
    };
    Text.prototype[k] = myFn;
  });
  return Text;
};

module.exports = addMethods;
