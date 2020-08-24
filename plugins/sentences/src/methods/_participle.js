//
// 'i could drive' -> 'i could have driven'

const useParticiple = function (vb) {
  if (vb.has('(could|should|would|may)')) {
    return true
  }
  return false
}

module.exports = {
  useParticiple,
}
