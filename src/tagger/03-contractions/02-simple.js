// const contraction = /(\p{L}+)'([a-z]{1,2})$/iu
const contraction = /([a-z\u00C0-\u00FF]+)'([a-z]{1,2})$/i

//these ones don't seem to be ambiguous
const easy = {
  ll: 'will',
  ve: 'have',
  re: 'are',
  m: 'am',
  "n't": 'not',
}
//
const checkApostrophe = function(term) {
  let parts = term.text.match(contraction)
  if (parts === null) {
    return null
  }
  if (easy.hasOwnProperty(parts[2])) {
    return [parts[1], easy[parts[2]]]
  }
  return null
}
module.exports = checkApostrophe
