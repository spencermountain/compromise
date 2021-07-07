const contraction = /([a-z\u00C0-\u00FF]+)[\u0027\u0060\u00B4\u2018\u2019\u201A\u201B\u2032\u2035\u2039\u203A]([a-z]{1,2})$/i

//these ones don't seem to be ambiguous
const easy = {
  ll: 'will',
  ve: 'have',
  re: 'are',
  m: 'am',
  "n't": 'not',
}
//
const checkApostrophe = function (term) {
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
