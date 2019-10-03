//add whitespace to the start of the second bit
const addWhitespace = function(beforeTerms, newTerms) {
  // add any existing pre-whitespace to beginning
  newTerms[0].pre = beforeTerms[0].pre
  let lastTerm = beforeTerms[beforeTerms.length - 1]

  //add any existing punctuation to end of our new terms
  let newTerm = newTerms[newTerms.length - 1]
  newTerm.post = lastTerm.post
  // remove existing punctuation
  lastTerm.post = ''

  //before ←[space]  - after
  if (lastTerm.post === '') {
    lastTerm.post += ' '
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
  if (len <= 0) {
    return
  }
  // console.log(doc.list[0].hasId('sdf'))
  let phrase = doc.list.find(p => p.hasId(id))
  // console.log(phrase)
  phrase.length += len
  // console.log('here')
  let parents = doc.parents()
  // parents = [].concat(parents)
  // parents.shift()
  // console.log(doc.text())
  // console.log(parents)
  // console.log(parents.map(d => d.text()))
  parents.forEach(parent => {
    // console.log('adding ' + len + " to '" + parent.text() + "'")
    phrase = parent.list.find(p => p.hasId(id))
    // console.log('\n', phrase, len, '\n\n')
    phrase.length += len
  })
}

//append one phrase onto another
const appendPhrase = function(main, newPhrase, doc) {
  // console.log(main.text(), '  |  ', newPhrase.text())
  let toAdd = newPhrase.length - main.length
  // console.log(toAdd + '\n\n')
  let beforeTerms = main.terms()
  //spruce-up the whitespace issues
  addWhitespace(beforeTerms, newPhrase.terms())
  //insert this segment into the linked-list
  stitchIn(main, newPhrase)
  //increase the length of our phrases
  stretchAll(doc, beforeTerms[0].id, newPhrase.length)
  return main
}
module.exports = appendPhrase
