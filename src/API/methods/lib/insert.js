// splice an array into an array
const spliceArr = (parent, index, child) => {
  let args = [index, 0].concat(child)
  Array.prototype.splice.apply(parent, args)
  return parent
}

// add a space at end, if required
const endSpace = function (terms) {
  const hasSpace = / $/
  let lastTerm = terms[terms.length - 1]
  if (hasSpace.test(lastTerm.post) === false) {
    lastTerm.post += ' '
  }
}

// sentence-ending punctuation should move in append
const movePunct = (source, end, needle) => {
  const juicy = /[.?!]/g // punctuation we wanna transfer
  let wasLast = source[end - 1]
  let post = wasLast.post
  if (juicy.test(post)) {
    let punct = post.match(juicy).join('') //not perfect
    let last = needle[needle.length - 1]
    last.post = punct + last.post + ' '
    // remove it, from source
    wasLast.post = wasLast.post.replace(juicy, '')
  }
}

const isTitleCase = function (str) {
  return /^[A-Z][a-z'\u00C0-\u00FF]/.test(str) || /^[A-Z]$/.test(str)
}

const toTitleCase = function (str) {
  str = str.replace(/^[a-z\u00C0-\u00FF]/, x => x.toUpperCase()) //TODO: support unicode
  return str
}

const moveTitleCase = function (home, start, needle) {
  let from = home[start]
  // should we bother?
  if (start !== 0 || !isTitleCase(from.text)) {
    return
  }
  // titlecase new first term
  needle[0].text = toTitleCase(needle[0].text)
  // should we un-titlecase the old word?
  let old = home[start]
  if (old.tags.has('ProperNoun') || old.tags.has('Acronym')) {
    return
  }
  if (isTitleCase(old.text) && old.text.length > 1) {
    old.text = old.text.replace(/^[A-Z]/, x => x.toLowerCase())
  }
}

// put these words before the others
const cleanPrepend = function (home, ptr, needle, document) {
  let [n, start, end] = ptr
  // introduce spaces appropriately
  if (start === 0) {
    // at start - need space in insert
    endSpace(needle)
  } else if (end === document[n].length) {
    // at end - need space in home
    endSpace(home)
  } else {
    // in middle - need space in home and insert
    endSpace(needle)
    endSpace([home[ptr[1]]])
  }
  moveTitleCase(home, start, needle)
  movePunct(home, end, needle)
  spliceArr(home, start, needle)
}

const cleanAppend = function (home, ptr, needle, document) {
  let [n, , end] = ptr
  let total = document[n].length
  if (end < total) {
    // are we in the middle?
    // add trailing space on predecessor
    // endSpace(home)
    // add trailing space on self
    endSpace(needle)
  } else if (total === end) {
    // are we at the end?
    // add a space to predecessor
    endSpace(home)
    // very end, move period
    movePunct(home, end, needle)
  }
  // do we need a space on new terms too?
  // if (document[n].length > end) {
  //   endSpace(needle)
  // }
  // if (document[n].length === end) {
  //   // very end, move period
  //   movePunct(home, end, needle)
  // } else {
  //   console.log(end, document[n].length)
  //   // add trailing space on predecessor
  //   endSpace(home)
  // }
  spliceArr(home, ptr[2], needle)
}

export { cleanPrepend, cleanAppend, spliceArr }
