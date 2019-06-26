//recursively decrease the length of all parent phrases
const shrinkAll = function(doc, id, deleteLength) {
  //find our phrase to stretch
  let phrase = doc.list.find(p => p.hasId(id))
  phrase.length -= deleteLength
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

  let prev = pool.get(terms[0].prev)
  let after = pool.get(terms[terms.length - 1].next)

  // connect [prev]->[after]
  if (prev) {
    prev.next = after.id
  }
  // connect [prev]<-[after]
  if (after) {
    after.prev = prev.id
  }
  //set phrase length?
  // phrase.length = 0
  shrinkAll(doc, prev.id, phrase.length)
}
module.exports = deletePhrase
