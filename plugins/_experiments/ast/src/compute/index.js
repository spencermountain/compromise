
export default {
  lines: function (view) {
    view.lines().forEach((arr, i) => {
      arr.forEach(s => {
        s.docs[0].forEach(term => {
          term.line = i
        })
      })
    })
  }
}