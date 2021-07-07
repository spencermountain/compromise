const endOfSentence = /[.?!]\s*$/

// replacing a 'word.' with a 'word!'
const combinePost = function (before, after) {
  //only transfer the whitespace
  if (endOfSentence.test(after)) {
    let whitespace = before.match(/\s*$/)
    return after + whitespace
  }
  return before
}

//add whitespace to the start of the second bit
const addWhitespace = function (beforeTerms, newTerms) {
  // add any existing pre-whitespace to beginning
  newTerms[0].pre = beforeTerms[0].pre
  let lastTerm = beforeTerms[beforeTerms.length - 1]

  //add any existing punctuation to end of our new terms
  let newTerm = newTerms[newTerms.length - 1]
  newTerm.post = combinePost(lastTerm.post, newTerm.post)
  // remove existing punctuation
  lastTerm.post = ''

  //before ←[space]  - after
  if (lastTerm.post === '') {
    lastTerm.post += ' '
  }
}

//insert this segment into the linked-list
const stitchIn = function (beforeTerms, newTerms, pool) {
  let lastBefore = beforeTerms[beforeTerms.length - 1]
  let lastNew = newTerms[newTerms.length - 1]
  let afterId = lastBefore.next
  //connect ours in (main → newPhrase)
  lastBefore.next = newTerms[0].id
  //stich the end in  (newPhrase → after)
  lastNew.next = afterId
  //do it backwards, too
  if (afterId) {
    // newPhrase ← after
    let afterTerm = pool.get(afterId)
    afterTerm.prev = lastNew.id
  }
  // before ← newPhrase
  let beforeId = beforeTerms[0].id
  if (beforeId) {
    let newTerm = newTerms[0]
    newTerm.prev = beforeId
  }
}

// avoid stretching a phrase twice.
const unique = function (list) {
  return list.filter((o, i) => {
    return list.indexOf(o) === i
  })
}

//append one phrase onto another.
const appendPhrase = function (before, newPhrase, doc) {
  let beforeTerms = before.terms()
  let newTerms = newPhrase.terms()
  //spruce-up the whitespace issues
  addWhitespace(beforeTerms, newTerms)
  //insert this segment into the linked-list
  stitchIn(beforeTerms, newTerms, before.pool)

  // stretch!
  // make each effected phrase longer
  let toStretch = [before]
  let hasId = before.start
  let docs = [doc]

  docs = docs.concat(doc.parents()) // find them all!

  docs.forEach(parent => {
    // only the phrases that should change
    let shouldChange = parent.list.filter(p => {
      return p.hasId(hasId)
    })
    toStretch = toStretch.concat(shouldChange)
  })
  // don't double-count a phrase
  toStretch = unique(toStretch)
  toStretch.forEach(p => {
    p.length += newPhrase.length
  })
  before.cache = {}
  return before
}
module.exports = appendPhrase
