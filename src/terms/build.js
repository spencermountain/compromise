'use strict';
const Term = require('../term');

const notWord = {
  '-': true,
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
    let hasHyphen = word.match(/^([a-z]+)(-)([a-z0-9].*)/i);
    if (hasHyphen) {
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
    if (arr[i].match(/\S/) && !notWord[arr[i]]) {
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
