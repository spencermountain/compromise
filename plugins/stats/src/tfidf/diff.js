const diff = function (doc, globe) {
  doc.forEach(a => {
    let global = globe[a[0]] || 0
    a[2] = a[1] - global
  })
  return doc.sort((a, b) => {
    if (a[2] > b[2]) {
      return -1
    } else if (a[2] < b[2]) {
      return 1
    }
    return 0
  })
}
export default diff