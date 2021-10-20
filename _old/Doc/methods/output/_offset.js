// get all character startings in doc
const termOffsets = function (doc) {
  let elapsed = 0
  let index = 0
  let offsets = {}
  doc.termList().forEach(term => {
    offsets[term.id] = {
      index: index,
      start: elapsed + term.pre.length,
      length: term.text.length,
    }
    elapsed += term.pre.length + term.text.length + term.post.length
    index += 1
  })
  return offsets
}

const calcOffset = function (doc, result, options) {
  // calculate offsets for each term
  let offsets = termOffsets(doc.all())
  // add index values
  if (options.terms.index || options.index) {
    result.forEach(o => {
      o.terms.forEach(t => {
        t.index = offsets[t.id].index
      })
      o.index = o.terms[0].index
    })
  }
  // add offset values
  if (options.terms.offset || options.offset) {
    result.forEach(o => {
      o.terms.forEach(t => {
        t.offset = offsets[t.id] || {}
      })
      // let len = o.terms.reduce((n, t, i) => {
      //   n += t.offset.length || 0
      //   //add whitespace, too
      //   console.log(t.post)
      //   return n
      // }, 0)

      // The offset information for the entire doc starts at (or just before)
      // the first term, and is as long as the whole text.  The code originally
      // copied the entire offset value from terms[0], but since we're now
      // overriding 2 of the three fields, it's cleaner to just create an all-
      // new object and not pretend it's "just" the same as terms[0].
      o.offset = {
        index: o.terms[0].offset.index,
        start: o.terms[0].offset.start - o.text.indexOf(o.terms[0].text),
        length: o.text.length,
      }
    })
  }
}
module.exports = calcOffset
