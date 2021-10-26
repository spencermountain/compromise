const splitOn = function (term) {
  if (!term) {
    return false
  }
  // veggies, like figs
  if (term.normal === 'like') {
    return false
  }
  // toronto, canada  - tuesday, march
  if (term.tags.has('Place') || term.tags.has('Date')) {
    return false
  }
  return true
}

// kind-of a dirty sentence chunker
const splitByClause = function (document) {
  const splitHere = /[,:;]/
  let arr = []
  document.forEach(terms => {
    let start = 0
    terms.forEach((term, i) => {
      // does it have a comma/semicolon ?
      if (splitHere.test(term.post) && splitOn(terms[i + 1])) {
        arr.push(terms.slice(start, i + 1))
        start = i + 1
      }
    })
    if (start < terms.length) {
      arr.push(terms.slice(start, terms.length))
    }
  })
  return arr
}

// runs all match/tag patterns in model.two.matches
const postTagger = function (document, world) {
  const { model, methods } = world
  let byGroup = methods.two.compile(model.two.matches, methods)
  // perform these matches on a comma-seperated document
  document = splitByClause(document)
  let found = methods.two.bulkMatch(document, byGroup, methods)
  // console.log(found.length, 'found')
  methods.two.bulkTagger(found, document, world)
  // 2nd time?
  // let subset = new Set(found.map(todo => todo.pointer[0]))
  // subset = Array.from(subset).map(n => document[n])
  // found = methods.two.bulkMatch(subset, byGroup, methods)
  // methods.two.bulkTagger(found, subset, world)
  return document
}

export default { postTagger }
