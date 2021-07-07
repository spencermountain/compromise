const topk = function (doc) {
  let list = doc.json({ text: false, terms: false, reduced: true })
  // combine them
  let obj = {}
  list.forEach(o => {
    if (!obj[o.reduced]) {
      o.count = 0
      obj[o.reduced] = o
    }
    obj[o.reduced].count += 1
  })
  let arr = Object.keys(obj).map(k => obj[k])
  // sort them
  arr.sort((a, b) => {
    if (a.count > b.count) {
      return -1
    } else if (a.count < b.count) {
      return 1
    }
    return 0
  })
  return arr
}
module.exports = topk
