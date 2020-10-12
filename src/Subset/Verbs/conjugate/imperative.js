// verb-phrases that are orders - 'close the door'
// these should not be conjugated
exports.isImperative = function (parsed) {
  // do the dishes
  if (parsed.auxiliary.has('do')) {
    return true
  }
  // speak the truth
  if (parsed.original.has('^#Infinitive')) {
    // 'i speak the truth' is not the same
    // if (parsed.subject.has('(i|we)')) {
    // return false
    // }
    return true
  }
  return false
}

// // basically, don't conjugate it
// exports.toImperative = function (parsed) {
//   let str = parsed.original.text()
//   let res = {
//     PastTense: str,
//     PresentTense: str,
//     FutureTense: str,
//     Infinitive: str,
//   }
//   return res
// }
