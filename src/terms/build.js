'use strict';
const Term = require('../term');
const hasHyphen = /^([a-z]+)(-)([a-z0-9].*)/i;
const wordlike = /\S/;

const notWord = {
  '-': true,
  '–': true,
  '--': true,
  '...': true,
};

//turn a string into an array of terms (naiive for now, lumped later)
const fromString = function (str) {
  let all = [];
  //start with a naiive split
  str = str || '';
  if (typeof str === 'number') {
    str = '' + str;
  }
  let firstSplit = str.split(/(\S+)/);
  let arr = [];
  for(let i = 0; i < firstSplit.length; i++) {
    let word = firstSplit[i];
    if (hasHyphen.test(word) === true) {
      //support multiple-hyphenated-terms
      let hyphens = word.split('-');
      for(let o = 0; o < hyphens.length; o++) {
        if (o === hyphens.length - 1) {
          arr.push(hyphens[o]);
        } else {
          arr.push(hyphens[o] + '-');
        }
      }
    } else {
      arr.push(word);
    }
  }
  //greedy merge whitespace+arr to the right
  let carry = '';
  for (let i = 0; i < arr.length; i++) {
    //if it's more than a whitespace
    if (wordlike.test(arr[i]) === true && notWord[arr[i]] === undefined) {
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
  return all.map((t) => new Term(t));
};
module.exports = fromString;
