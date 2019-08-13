const hasSpace = / /

//a new space needs to be added, either on the new phrase, or the old one
// '[new] [◻old]'   -or-   '[old] [◻new] [old]'
const addWhitespace = function(original, newPhrase, newTerms) {
  //is there a word before our entry-point?
  let term = original.pool.get(original.start)
  if (term.prev) {
    //add our space ahead of our new terms
    let firstWord = newTerms[0]
    if (hasSpace.test(firstWord.pre) === false) {
      firstWord.post += ' '
    }
    return
  }
  //otherwise, add our space to the start of original
  if (hasSpace.test(term.pre) === false) {
    term.pre = ' ' + term.pre
  }
  return
}

//insert this segment into the linked-list
const stitchIn = function(main, newPhrase, newTerms) {
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

//recursively increase the length of all parent phrases
const stretchAll = function(doc, oldStart, newPhrase) {
  //find our phrase to stretch
  let phrase = doc.list.find(p => p.hasId(oldStart) || p.hasId(newPhrase.start))
  if (phrase === undefined) {
    console.error('compromise error: Prepend missing start - ' + oldStart)
    return
  }
  //should we update the phrase's starting?
  if (phrase.start === oldStart) {
    phrase.start = newPhrase.start
  }
  phrase.length += newPhrase.length
  if (doc.from) {
    stretchAll(doc.from, oldStart, newPhrase)
  }
}

//append one phrase onto another
const joinPhrase = function(original, newPhrase, doc) {
  let newTerms = newPhrase.terms()
  let oldStart = original.start
  //spruce-up the whitespace issues
  addWhitespace(original, newPhrase, newTerms)
  //insert this segment into the linked-list
  stitchIn(original, newPhrase, newTerms)
  //increase the length of our phrases
  stretchAll(doc, oldStart, newPhrase)
  return original
}
module.exports = joinPhrase
