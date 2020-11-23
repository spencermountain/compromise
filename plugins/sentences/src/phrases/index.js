exports.phrases = function () {
  let arr = []
  this.forEach((s) => {
    s = s.splitOn('#VerbPhrase+')
    s = s.splitOn('#NounPhrase+')
    arr = arr.concat(s.list)
  })
  return this.buildFrom(arr)
}
