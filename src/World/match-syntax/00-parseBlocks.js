// match  'foo /yes/' and not 'foo/no/bar'
const bySlashes = /(?:^|\s)(\/.*?[^\\\/]\/)(?:\s|$)/g
// match '(yes) but not foo(no)bar'
const byParentheses = /(?:^|\s)(\(.*?[^\\\)]\))(?:\s|$)/g
// okay
const byWord = / /g

const isBlock = str => /^\(/.test(str) && /\)$/.test(str)
const isReg = str => /^\//.test(str) && /\/$/.test(str)

const cleanUp = function (arr) {
  arr = arr.map(str => str.trim())
  arr = arr.filter(str => str)
  return arr
}

const parseBlocks = function (txt) {
  // parse by regex, first
  let arr = txt.split(bySlashes)
  let res = []
  arr.forEach(str => {
    res = res.concat(str.split(byParentheses))
  })
  res = cleanUp(res)
  // split by word, now
  let final = []
  res.forEach(str => {
    if (isBlock(str)) {
      final.push(str)
    } else if (isReg(str)) {
      final.push(str)
    } else {
      final = final.concat(str.split(byWord))
    }
  })
  final = cleanUp(final)
  return final
}
module.exports = parseBlocks

console.log(parseBlocks(`before /foo bar/ and (yes sir)`))
// console.log(parseBlocks(`before (yes) no(t)here (no but (here/here\\) foo`))
