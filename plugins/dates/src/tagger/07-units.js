const here = 'unit-tagger'
//
const tagUnits = function (doc) {
  if (doc.has('#Date')) {
    doc.replace('week end', 'weekend')
    doc
      .match('(#Ordinal|this|last|final|first|next) [(day|week|weekend|month|quarter|season|hour)]', 0)
      .tag('DateUnit', here)
  }
  return doc
}
module.exports = tagUnits
