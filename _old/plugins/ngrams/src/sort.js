const sort = function(arr) {
  arr = arr.sort((a, b) => {
    //first sort them by count
    if (a.count > b.count) {
      return -1
    }
    if (a.count < b.count) {
      return 1
    }
    // in a tie, sort them by size
    if (a.size > b.size) {
      return -1
    }
    if (a.size < b.size) {
      return 1
    }
    return 0
  })
  return arr
}
module.exports = sort
