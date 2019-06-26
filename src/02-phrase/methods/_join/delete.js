//recursively decrease the length of all the parent phrases
const shrinkAll = function(doc, id, deleteLength, after) {
  //find our phrase to shrink
  let phrase = doc.list.find(p => p.hasId(id))
  phrase.length -= deleteLength

  //does it start with this soon-removed word?
  if (phrase.start === id) {
    phrase.start = after.id
  }
  if (doc.from) {
    shrinkAll(doc.from, id, deleteLength)
  }
}

/** wrap the linked-list around these terms
 * so they don't appear any more
 */
const deletePhrase = function(phrase, doc) {
  let pool = doc.pool()
  let terms = phrase.terms()

  //grab both sides of the chain,
  let prev = pool.get(terms[0].prev) || {}
  let after = pool.get(terms[terms.length - 1].next) || {}

  //first, change phrase lengths
  shrinkAll(doc, phrase.start, phrase.length, after)

  // connect [prev]->[after]
  if (prev) {
    prev.next = after.id
  }
  // connect [prev]<-[after]
  if (after) {
    after.prev = prev.id
  }

  // lastly, actually delete the terms from the pool
  for (let i = 0; i < terms.length; i++) {
    pool.remove(terms[i].id)
  }
}
module.exports = deletePhrase
