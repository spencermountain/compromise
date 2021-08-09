import setTag from './_setTag.js'
// tags that are neither plural or singular
const uncountable = [
  'Acronym',
  'Abbreviation',
  'ProperNoun',
  'Uncountable',
  'Possessive',
  'Pronoun',
  'Activity',
  'Honorific',
]
// try to guess if each noun is a plural/singular
const pluralSingular = function (term) {
  if (!term.tags.has('Noun') || term.tags.has('Plural') || term.tags.has('Singular')) {
    return
  }
  if (uncountable.find(tag => term.tags.has(tag))) {
    return
  }
  if (term.normal.endsWith('s')) {
    setTag(term, 'Plural', 'plural-guess')
  } else {
    setTag(term, 'Singular', 'singular-guess')
  }
}

//add deduced parent tags to our terms
const fillTags = function (terms, model) {
  terms.forEach(term => {
    //there is probably just one tag, but we'll allow more
    let tags = Array.from(term.tags)
    for (let i = 0; i < tags.length; i += 1) {
      if (model.two.tags[tags[i]]) {
        let toAdd = model.two.tags[tags[i]].parents
        setTag(term, toAdd, `-infer from ${tags[i]}`)
      }
    }
    // turn 'Noun' into Plural/Singular
    pluralSingular(term)
  })
}
export default fillTags
