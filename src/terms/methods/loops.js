'use strict';
//these methods are simply term-methods called in a loop

const addMehtods = (Terms) => {

  const foreach = [
    ['tagAs', ''],
    ['unTag', ''],
    ['canBe', ''],
    ['toTitleCase', 'TitleCase'],
    ['toUpperCase', 'UpperCase'],
  ];

  foreach.forEach((arr) => {
    let k = arr[0];
    let tag = arr[1];
    let myFn = function () {
      let args = arguments;
      this.terms.forEach((t) => {
        t[k].apply(t, args);
      });
      if (tag) {
        this.tagAs(tag, k);
      }
      return this;
    };
    Terms.prototype[k] = myFn;
  });
  return Terms;
};

module.exports = addMehtods;
