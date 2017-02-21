'use strict';
//this methods are simply loops around each termList object.
let foreach = [
  'toTitleCase',
  'toUpperCase',
  'toLowerCase',
  'toCamelCase',

  'hyphenate',
  'dehyphenate',

  'insertBefore',
  'insertAfter',
  'insertAt',

  'replace',
  'replaceWith',

  'delete',

// 'tag',
// 'unTag',
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
