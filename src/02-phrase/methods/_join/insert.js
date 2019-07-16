//insert this segment into the linked-list
const stitchIn = function(phrase, index, newPhrase) {
  let terms = phrase.terms()
  // [ours] → [new]
  let lastTerm = terms[index]
  lastTerm.next = newPhrase.start
  // [new] → [ours]
  if (terms[index + 1]) {
    let end = newPhrase.lastTerm()
    end.next = terms[index + 1].id
  }

  //see if there's a word before original
  // [new] → [ours]
  // let start = pool.get(phrase.start)
  // if (start.prev) {
  //   let before = pool.get(start.prev)
  //   before.next = newPhrase.start //wire it in
  // }
}

//append one phrase onto another
const insertAt = function(phrase, index, newPhrase, doc) {
  //insert this segment into the linked-list
  stitchIn(phrase, index, newPhrase)
  //increase the length of our phrases
  // stretchAll(doc, phrase, newPhrase)
  return phrase
}
module.exports = insertAt
