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
const movePunct = (source, needle) => {
  const juicy = /[.?!]/g // punctuation we wanna transfer
  let wasLast = source[source.length - 1]
  let post = wasLast.post
  if (juicy.test(post)) {
    let punct = post.match(juicy).join('') //not perfect
    let last = needle[needle.length - 1]
    last.post = punct + last.post + ' '
    // remove it, from source
    wasLast.post = wasLast.post.replace(juicy, '')
  }
}

const insert = function (str, view, append) {
  const { methods, document, world } = view
  // insert words at end of each doc
  let ptrs = view.fullPointer
  ptrs.forEach(ptr => {
    let [n, start, end] = ptr
    // add-in the words
    let home = document[n]
    let needle = methods.one.tokenize(str, world)[0] //assume one sentence
    if (append) {
      // introduce spaces appropriately
      if (end === 0) {
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
      movePunct(home, needle)
      spliceArr(home, end, needle)
    } else {
      endSpace(needle)
      spliceArr(home, start, needle)
    }
    // extend the pointer
    ptr[2] += needle.length
  })
  // convert them to whole sentences
  ptrs = ptrs.map(a => [a[0]])
  let doc = view.update(ptrs)
  // try to tag them, too
  doc.compute(['preTagger', 'contractions', 'postTagger'])
  return doc
}

const insertAfter = function (str) {
  return insert(str, this, true)
}
const insertBefore = function (str) {
  return insert(str, this, false)
}

// add string as new sentence
const concat = function (input) {
  const { methods, document, world } = this
  // parse and splice-in new terms
  if (typeof input === 'string') {
    let json = methods.one.tokenize(input, world)
    let ptrs = this.fullPointer
    let lastN = ptrs[ptrs.length - 1][0]
    spliceArr(document, lastN + 1, json)
    return this
  }
  // is it other pointers from the same document?
  if (this.document === input.document) {
    let ptrs = this.fullPointer
    ptrs = ptrs.concat(input.fullPointer)
    return this.update(ptrs)
  }
  return this
}

export default {
  insertAfter,
  insertBefore,
  concat,
  append: insertAfter,
  prepend: insertBefore,
  insert: insertAfter,
}
