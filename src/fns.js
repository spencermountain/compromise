
exports.pluck = function(arr, str) {
  return arr.map(function(o) {
    return o[str]
  })
}
