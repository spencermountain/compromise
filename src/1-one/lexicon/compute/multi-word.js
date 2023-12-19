// scan-ahead to match multiple-word terms - 'jack rabbit'
const multiWord = function (terms, i, world) {
  const { model, methods } = world
  // const { fastTag } = methods.one
  const setTag = methods.one.setTag
  const multi = model.one._multiCache || {}
  const { lexicon, freezeLex } = model.one || {}
  // basic lexicon lookup
  let t = terms[i]
  let word = t.machine || t.normal
  // multi-word lookup
  if (terms[i + 1] !== undefined && multi[word] === true) {
    let max = i + 4 > terms.length ? terms.length - i : 4
    let str = terms[i].machine || terms[i].normal
    for (let skip = 1; skip < max; skip += 1) {
      let tm = terms[i + skip]
      str += ' ' + (tm.machine || tm.normal)
      // check frozen lexicon, first
      if (freezeLex.hasOwnProperty(str) === true) {
        let ts = terms.slice(i, i + skip + 1)
        setTag(ts, freezeLex[str], world, false, '1-frozen-multi-lexicon')
        ts.forEach(term => (term.frozen = true))
      }
      // check normal lexicon
      if (lexicon.hasOwnProperty(str) === true) {
        let tag = lexicon[str]
        let ts = terms.slice(i, i + skip + 1)
        setTag(ts, tag, world, false, '1-multi-lexicon')

        // special case for phrasal-verbs - 2nd word is a #Particle
        if (tag && tag.length === 2 && (tag[0] === 'PhrasalVerb' || tag[1] === 'PhrasalVerb')) {
          // guard against 'take walks in'
          // if (terms[i + skip - 2] && terms[i + skip - 2].tags.has('Infinitive')) { }
          setTag([ts[1]], 'Particle', world, false, '1-phrasal-particle')
        }
        return true
      }
    }
    return false
  }
  return null
}
export default multiWord
