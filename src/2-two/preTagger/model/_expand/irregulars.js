// harvest list of irregulars for any juicy word-data
const expandIrregulars = function (model) {
  const { irregularPlurals } = model.two
  const { lexicon, } = model.one
  // scounge irregulars for any interesting lexicon-data:
  // Object.entries(irregularVerbs).forEach(a => {
  //   let [inf, conj] = a
  //   lexicon[inf] = lexicon[inf] || 'Infinitive'
  //   Object.keys(conj).forEach(tag => {
  //     let word = conj[tag]
  //     if (word !== '') {
  //       lexicon[word] = lexicon[word] || tag
  //     }
  //   })
  // })
  Object.entries(irregularPlurals).forEach(a => {
    lexicon[a[0]] = lexicon[a[0]] || 'Singular'
    lexicon[a[1]] = lexicon[a[1]] || 'Plural'
  })
  return model
}
export default expandIrregulars
