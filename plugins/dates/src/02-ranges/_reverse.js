const reverseMaybe = function (obj) {
  let start = obj.start
  let end = obj.end
  if (start.d.isAfter(end.d)) {
    let tmp = start
    obj.start = end
    obj.end = tmp
  }
  return obj
}
module.exports = reverseMaybe
