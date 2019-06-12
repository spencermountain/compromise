const hasSpace = / /

//a new space needs to be added, either on the new phrase, or the old one
// '[new] [◻old]'   -or-   '[old] [◻new] [old]'
const addWhitespace = function(original, newPhrase) {
  //is there a word before our entry-point?
  let term = original.pool.get(original.start)
  if (term.prev) {
    //add our space ahead of our new terms
    let firstWord = newPhrase.terms()[0]
    if (hasSpace.test(firstWord.preText) === false) {
      firstWord.preText = ' ' + firstWord.preText
    }
    return
  }
  //otherwise, add our space to the start of original
  if (hasSpace.test(term.preText) === false) {
    term.preText = ' ' + term.preText
  }
  return
}

//insert this segment into the linked-list
const stitchIn = function(original, newPhrase) {
  // [ours] → [original]
  let newTerms = newPhrase.terms()
  newTerms[newTerms.length - 1].next = original.start
  //see if there's a word before original
  // [before] → [ours]
  let pool = original.pool
  let start = pool.get(original.start)
  if (start.prev) {
    let before = pool.get(start.prev)
    before.next = newPhrase.start //wire it in
  }
}

//recursively increase the length of all parent phrases
const stretchAll = function(doc, original, newPhrase) {
  //find our phrase to stretch
  let phrase = doc.list.find(p => p.hasId(original.start))
  if (phrase === undefined) {
    console.error('compromise error: Prepend missing start - ' + original.start)
    return
  }
  //should we update the phrase's starting?
  if (phrase.start === original.start) {
    phrase.start = newPhrase.start
  }
  phrase.length += newPhrase.length
  if (doc.from) {
    stretchAll(doc.from, original, newPhrase)
  }
}

//append one phrase onto another
const joinPhrase = function(original, newPhrase, doc) {
  //spruce-up the whitespace issues
  addWhitespace(original, newPhrase)
  //insert this segment into the linked-list
  stitchIn(original, newPhrase)
  //increase the length of our phrases
  stretchAll(doc, original, newPhrase)
  return original
}
module.exports = joinPhrase
