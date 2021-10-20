const hasSpace = / /

//a new space needs to be added, either on the new phrase, or the old one
// '[new] [◻old]'   -or-   '[old] [◻new] [old]'
const addWhitespace = function (newTerms) {
  //add a space before our new text?
  // add a space after our text
  let lastTerm = newTerms[newTerms.length - 1]
  if (hasSpace.test(lastTerm.post) === false) {
    lastTerm.post += ' '
  }
  return
}

//insert this segment into the linked-list
const stitchIn = function (main, newPhrase, newTerms) {
  // [newPhrase] → [main]
  let lastTerm = newTerms[newTerms.length - 1]
  lastTerm.next = main.start
  // [before] → [main]
  let pool = main.pool
  let start = pool.get(main.start)
  if (start.prev) {
    let before = pool.get(start.prev)
    before.next = newPhrase.start
  }
  //do it backwards, too
  // before ← newPhrase
  newTerms[0].prev = main.terms(0).prev
  // newPhrase ← main
  main.terms(0).prev = lastTerm.id
}

const unique = function (list) {
  return list.filter((o, i) => {
    return list.indexOf(o) === i
  })
}

//append one phrase onto another
const joinPhrase = function (original, newPhrase, doc) {
  const starterId = original.start
  let newTerms = newPhrase.terms()
  //spruce-up the whitespace issues
  addWhitespace(newTerms, original)
  //insert this segment into the linked-list
  stitchIn(original, newPhrase, newTerms)
  //increase the length of our phrases
  let toStretch = [original]
  let docs = [doc]
  docs = docs.concat(doc.parents())
  docs.forEach(d => {
    // only the phrases that should change
    let shouldChange = d.list.filter(p => {
      return p.hasId(starterId) || p.hasId(newPhrase.start)
    })
    toStretch = toStretch.concat(shouldChange)
  })
  // don't double-count
  toStretch = unique(toStretch)
  // stretch these phrases
  toStretch.forEach(p => {
    p.length += newPhrase.length
    // change the start too, if necessary
    if (p.start === starterId) {
      p.start = newPhrase.start
    }
    p.cache = {}
  })
  return original
}
module.exports = joinPhrase
