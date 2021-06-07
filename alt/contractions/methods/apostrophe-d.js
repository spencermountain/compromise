const hasContraction = /'/
const _apostropheD = function (terms, i) {
  // had/would/did
  let before = terms[i].normal.split(hasContraction)[0]
  return [before, 'would']
}
module.exports = _apostropheD
