'use strict';
//
const getTerms = (needle) => {
  let arr = [];
  if (needle.isA === 'Terms') {
    arr = needle.terms;
  } else if (needle.isA === 'Text') {
    arr = needle.flatten().list[0].terms;
  } else if (needle.isA === 'Term') {
    arr = [needle];
  }
  return arr;
};

//remove them
exports.deleteThese = (source, needle) => {
  let arr = getTerms(needle);
  source.terms = source.terms.filter((t) => {
    for (let i = 0; i < arr.length; i++) {
      if (t === arr[i]) {
        return false;
      }
    }
    return true;
  });
  return source;
};

//add them
exports.insertAt = (terms, i, needle) => {
  needle.dirty = true;
  let arr = getTerms(needle);
  //handle whitespace
  if (i > 0 && arr[0] && !arr[0].whitespace.before) {
    arr[0].whitespace.before = ' ';
  }
  //gnarly splice
  //-( basically  - terms.splice(i+1, 0, arr) )
  Array.prototype.splice.apply(terms, [i, 0].concat(arr));
  return terms;
};
