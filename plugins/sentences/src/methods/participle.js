//
// 'i could drive' -> 'i could have driven'

const useParticiple = function (vb) {
  if (vb.has('(could|should|would)')) {
    return true
  }
  return false
}
const toParticiple = function (obj) {}

module.exports = {
  useParticiple,
  toParticiple,
}
