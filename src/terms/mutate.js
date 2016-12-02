'use strict';
//
const getTerms = (needle) => {
  let arr = []
  if (needle.isA === 'Terms') {
    arr = needle.terms
  } else if (needle.isA === 'Text') {
    arr = needle.terms()
  } else if (needle.isA === 'Term') {
    arr = [needle]
  }
  return arr
}

//remove them
exports.deleteThese = (parent, needle) => {
  let arr = getTerms(needle)
  parent.terms = parent.terms.filter((t) => {
    for (let i = 0; i < arr.length; i++) {
      if (t === arr[i]) {
        return false
      }
    }
    return true
  })
  return parent
}

//add them
exports.insertAt = (parent, i, needle) => {
  let arr = needle.terms
  //gnarly splice
  //- basically   terms.splice(i+1, 0, arr)
  Array.prototype.splice.apply(parent.terms, [i,0].concat(arr));
  return parent
}
