const diff = function (doc, globe) {
  doc.forEach(a => {
    let global = globe[a[0]] || 0
    // console.log(a[1], global)
    a[1] = a[1] - global
  })
  doc = doc.sort((a, b) => {
    if (a[2] > b[2]) {
      return -1
    } else if (a[2] < b[2]) {
      return 1
    }
    return 0
  })
  return doc
}
export default diff