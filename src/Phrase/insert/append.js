const endOfSentence = /[.?!]\s*$/

// replacing a 'word.' with a 'word!'
const combinePost = function(before, after) {
  //only transfer the whitespace
  if (endOfSentence.test(after)) {
    let whitespace = before.match(/\s*$/)
    return after + whitespace
  }
  return before
}

//add whitespace to the start of the second bit
const addWhitespace = function(beforeTerms, newTerms) {
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
const stitchIn = function(main, newPhrase) {
  // console.log(main.text(), newPhrase.text())
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
  // main.length += newPhrase.length
}

// const stitchParent=function(doc){}

// avoid stretching a phrase twice.
const unique = function(list) {
  // let obj = {}
  // list = list.filter(p => {
  //   let id = p.start + '_' + p.length
  //   if (obj[id] === true) {
  //     return false
  //   }
  //   obj[id] = true
  //   return true
  // })
  // console.log(list.length)
  // return list
  // console.log(list)
  return list.filter((o, i) => {
    return list.indexOf(o) === i
  })
}

//append one phrase onto another.
const appendPhrase = function(before, newPhrase, doc) {
  let beforeTerms = before.terms()
  //spruce-up the whitespace issues
  addWhitespace(beforeTerms, newPhrase.terms())
  //insert this segment into the linked-list
  stitchIn(before, newPhrase)

  // stretch!
  // make each effected phrase longer
  let toStretch = [before]
  let hasId = before.start
  let docs = [doc]
  // console.log(before.text())

  docs = docs.concat(doc.parents()) // find them all!
  // console.log(docs)
  docs.forEach(parent => {
    // only the phrases that should change
    let shouldChange = parent.list.filter(p => {
      return p.hasId(hasId)
    })
    toStretch = toStretch.concat(shouldChange)
  })
  // don't double-count a phrase
  toStretch = unique(toStretch)
  // console.log(toStretch)
  toStretch.forEach(p => {
    p.length += newPhrase.length
  })
  // let from = doc.from
  // from.debug()
  // console.log(from.list[0].terms(0).next)
  // console.log(before)
  // console.log(doc.parents().map(d => d.text()))
  // toStretch.forEach(p => console.log(p.text()))
  return before
}
module.exports = appendPhrase
