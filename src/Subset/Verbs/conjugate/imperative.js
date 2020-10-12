// verb-phrases that are orders - 'close the door'
// these should not be conjugated
exports.isImperative = function (parsed) {
  // do the dishes
  if (parsed.auxiliary.has('do')) {
    return true
  }
  // speak the truth
  // if (parsed.verb.has('^#Infinitive')) {
  //   // 'i speak' is not imperative
  //   if (parsed.subject.has('(i|we|you|they)')) {
  //     return false
  //   }
  //   return true
  // }
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
