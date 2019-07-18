const hasSpace = / /

//add whitespace to the start of the second bit
const addWhitespace = function(two) {
  let firstWord = two[0]
  if (hasSpace.test(firstWord.preText) === false) {
    firstWord.preText = ' ' + firstWord.preText
  }
}

//insert this segment into the linked-list
const stitchIn = function(main, newPhrase) {
  let afterId = main.lastTerm().next
  //connect ours in (main → newPhrase)
  main.lastTerm().next = newPhrase.start
  //stich the end in  (newPhrase → after)
  newPhrase.lastTerm().next = afterId
  //do it backwards, too
  if (afterId) {
    // newPhrase ← after
    let afterTerm = main.pool.get(afterId)
    afterTerm.prev = newPhrase.lastTerm().id
  }
  // before ← newPhrase
  let beforeId = main.terms(0).id
  if (beforeId) {
    let newTerm = newPhrase.terms(0)
    newTerm.prev = beforeId
  }
}

//recursively increase the length of all parent phrases
const stretchAll = function(doc, id, len) {
  //find our phrase to stretch
  let phrase = doc.list.find(p => p.hasId(id))
  phrase.length += len
  if (doc.from) {
    stretchAll(doc.from, id, len)
  }
}

//append one phrase onto another
const joinPhrase = function(main, newPhrase, doc) {
  let firstTerms = main.terms()
  //spruce-up the whitespace issues
  addWhitespace(newPhrase.terms())
  //insert this segment into the linked-list
  stitchIn(main, newPhrase)
  //increase the length of our phrases
  stretchAll(doc, firstTerms[0].id, newPhrase.length)
  return main
}
module.exports = joinPhrase
