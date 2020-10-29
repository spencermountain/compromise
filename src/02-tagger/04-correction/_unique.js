const unique = function (arr) {
  let obj = {}
  for (let i = 0; i < arr.length; i++) {
    obj[arr[i]] = true
  }
  return Object.keys(obj)
}
module.exports = unique
