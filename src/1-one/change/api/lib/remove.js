// Remove only the first qualifying run, matching String.replace without /g.
const removeRunBefore = (str, run, following) => {
  let i = 0
  while (i < str.length) {
    if (!run.includes(str[i])) {
      i++
      continue
    }
    const start = i
    while (i < str.length && run.includes(str[i])) i++
    if (i < str.length && following.includes(str[i])) {
      return str.slice(0, start) + str.slice(i)
    }
  }
  return str
}

// transfer sentence-ending punctuation
const repairPunct = function (terms, len) {
  const last = terms.length - 1
  const from = terms[last]
  const to = terms[last - len]
  if (to && from) {
    to.post += from.post //this isn't perfect.
    to.post = removeRunBefore(to.post, ' ', '.?!,;:')
    // don't allow any silly punctuation outcomes like ',!'
    to.post = removeRunBefore(to.post, ',;:', '.?!')
  }
}

// remove terms from document json
const pluckOut = function (document, nots) {
  nots.forEach(ptr => {
    const [n, start, end] = ptr
    const len = end - start
    if (!document[n]) {
      return // weird!
    }
    if (end === document[n].length && end > 1) {
      repairPunct(document[n], len)
    }
    document[n].splice(start, len) // replaces len terms at index start
  })
  // remove any now-empty sentences
  // (foreach + splice = 'mutable filter')
  for (let i = document.length - 1; i >= 0; i -= 1) {
    if (document[i].length === 0) {
      document.splice(i, 1)
      // remove any trailing whitespace before our removed sentence
      if (i === document.length && document[i - 1]) {
        const terms = document[i - 1]
        const lastTerm = terms[terms.length - 1]
        if (lastTerm) {
          lastTerm.post = lastTerm.post.trimEnd()
        }
      }
      // repair any downstream indexes
      // for (let k = i; k < document.length; k += 1) {
      //   document[k].forEach(term => term.index[0] -= 1)
      // }
    }
  }
  return document
}

export default pluckOut