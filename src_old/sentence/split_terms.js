'use strict';
//an initial, naiive split of arr based on spaces

const split_terms = function(str) {
  let result = [];
  //start with a naiive split
  const arr = str.split(/(\S+)/);
  //greedy merge whitespace+arr to the right
  let carry = '';
  for (let i = 0; i < arr.length; i++) {
    //if it's more than a whitespace
    if (arr[i].match(/\S/)) {
      result.push(carry + arr[i]);
      carry = '';
    } else {
      carry += arr[i];
    }
  }
  //handle last one
  if (carry && result.length > 0) {
    result[result.length - 1] += carry; //put it on the end
  }
  return result;
};

module.exports = split_terms;
// console.log(split_terms('john is nice'))
// console.log(split_terms('  john   is   nice '))
// console.log(split_terms("  john\tis \n  nice "))
