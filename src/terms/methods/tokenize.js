'use strict';
const Term = require('../../term');

//turn a string into an array of terms (naiive for now, lumped later)
const tokenize = function (str) {
  let all = [];
  //start with a naiive split
  const arr = str.split(/(\S+)/);
  //greedy merge whitespace+arr to the right
  let carry = '';
  for (let i = 0; i < arr.length; i++) {
    //if it's more than a whitespace
    if (arr[i].match(/\S/)) {
      all.push(carry + arr[i]);
      carry = '';
    } else {
      carry += arr[i];
    }
  }
  //handle last one
  if (carry && all.length > 0) {
    all[all.length - 1] += carry; //put it on the end
  }
  return all.map((t) => new Term(t))
};
module.exports = tokenize
