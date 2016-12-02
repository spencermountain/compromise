'use strict';
//

exports.deleteThese = (parent, needle) => {
  let arr = []
  if (needle.isA === 'Terms') {
    arr = needle.terms
  } else if (needle.isA === 'Text') {
    arr = needle.terms()
  } else if (needle.isA === 'Term') {
    arr = [needle]
  }
  //remove them
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
