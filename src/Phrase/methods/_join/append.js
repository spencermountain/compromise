const hasSpace = / /

//add whitespace to the start of the second bit
const addWhitespace = function(newTerms, beforeTerms) {
  // let firstWord = newTerms[0]
  // if (hasSpace.test(firstWord.post) === false) {
  // firstWord.post += ' '
  // }
  let lastTerm = newTerms[newTerms.length - 1]
  lastTerm.post = beforeTerms[0].post
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
  let phrase = doc.list.find(p => p.hasId(id))
  phrase.length += len

  //FIXME: inside .map() it stretches parent too far
  let parents = doc.parents()
  parents.forEach(parent => {
    phrase = parent.list.find(p => p.hasId(id))
    phrase.length += len
  })
}

//append one phrase onto another
const joinPhrase = function(main, newPhrase, doc) {
  let beforeTerms = main.terms()
  //spruce-up the whitespace issues
  addWhitespace(newPhrase.terms(), beforeTerms)
  //insert this segment into the linked-list
  stitchIn(main, newPhrase)
  //increase the length of our phrases
  stretchAll(doc, beforeTerms[0].id, newPhrase.length)
  return main
}
module.exports = joinPhrase
