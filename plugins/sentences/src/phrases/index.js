exports.phrases = function () {
  let arr = []
  this.forEach((s) => {
    s = s.splitOn('#VerbPhrase+')
    s = s.splitOn('#NounPhrase+')
    s = s.splitOn('#AdjectivePhrase+')
    arr = arr.concat(s.list)
  })
  return this.buildFrom(arr)
}
