const contraction = /^(l|c|d|j|m|n|qu|s|t)[\u0027\u0060\u00B4\u2018\u2019\u201A\u201B\u2032\u2035\u2039\u203A]([a-z\u00C0-\u00FF]+)$/i
// basic support for ungendered french contractions
// not perfect, but better than nothing, to support matching on french text.

const french = {
  l: 'le', // l'amour
  c: 'ce', // c'est
  d: 'de', // d'amerique
  j: 'je', // j'aime
  m: 'me', // m'appelle
  n: 'ne', // n'est
  qu: 'que', // qu'il
  s: 'se', // s'appelle
  t: 'tu', // t'aime
}

const checkFrench = function (term) {
  let parts = term.text.match(contraction)
  if (parts === null || french.hasOwnProperty(parts[1]) === false) {
    return null
  }
  let arr = [french[parts[1]], parts[2]]
  if (arr[0] && arr[1]) {
    return arr
  }
  return null
}
module.exports = checkFrench
