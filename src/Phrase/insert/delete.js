//recursively decrease the length of all the parent phrases
const shrinkAll = function (doc, id, deleteLength, after) {
  let arr = doc.parents()
  arr.push(doc)

  arr.forEach(d => {
    //find our phrase to shrink
    let phrase = d.list.find(p => p.hasId(id))
    if (!phrase) {
      return
    }
    phrase.length -= deleteLength
    // does it start with this soon-removed word?
    if (phrase.start === id) {
      phrase.start = after.id
    }
    phrase.cache = {}
  })
  // cleanup empty phrase objects
  doc.list = doc.list.filter(p => {
    if (!p.start || !p.length) {
      return false
    }
    return true
  })
}

/** wrap the linked-list around these terms
 * so they don't appear any more
 */
const deletePhrase = function (phrase, doc) {
  let pool = doc.pool()
  let terms = phrase.terms()

  //grab both sides of the chain,
  let prev = pool.get(terms[0].prev) || {}
  let after = pool.get(terms[terms.length - 1].next) || {}

  if (terms[0].implicit && prev.implicit) {
    prev.set(prev.implicit)
    prev.post += ' '
  }

  // //first, change phrase lengths
  shrinkAll(doc, phrase.start, phrase.length, after)

  // connect [prev]->[after]
  if (prev) {
    prev.next = after.id
  }
  // connect [prev]<-[after]
  if (after) {
    after.prev = prev.id
  }

  // lastly, actually delete the terms from the pool?
  // for (let i = 0; i < terms.length; i++) {
  //   pool.remove(terms[i].id)
  // }
}
module.exports = deletePhrase
