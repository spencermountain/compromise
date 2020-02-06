const list = require('./_corrections')

const runner = function(doc) {
  list.forEach(c => {
    // tagsafe
    if (c[4] === true) {
      doc.match(c[0], c[1]).tagSafe(c[2], c[3])
    } else {
      doc.match(c[0], c[1]).tag(c[2], c[3])
    }
  })
}
module.exports = runner
