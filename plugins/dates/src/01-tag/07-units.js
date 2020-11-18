const here = 'unit-tagger'
//
const tagUnits = function (doc) {
  if (doc.has('#Date')) {
    doc.replace('week end', 'weekend')
    doc.match('(this|last|final|first|next) [(day|week|weekend|month|quarter|season)]', 0).tag('DateUnit', here)
  }
  return doc
}
module.exports = tagUnits
