const hasContraction = /'/
const isPossessive = require('./_isPossessive')

const apostropheS = function (terms, i) {
  // !possessive, is/has
  let before = terms[i].normal.split(hasContraction)[0]
  if (isPossessive(terms, i) === true) {
    return null
  }
  return [before, 'is']
}
module.exports = apostropheS
