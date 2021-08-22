// splice an array into an array
const spliceArr = (parent, index, child) => {
  let args = [index, 0].concat(child)
  Array.prototype.splice.apply(parent, args)
  return parent
}

// this should probably be methods/one
const clone = function (terms) {
  return terms.slice().map(term => {
    term = Object.assign({}, term)
    term.tags = new Set(term.tags)
    return term
  })
}

const addSpace = function (terms) {
  terms[terms.length - 1].post += ' '
}

// sentence-ending punctuation should move in append
const movePunct = (source, needle) => {
  const juicy = /[.?!]/g // punctuation we wanna transfer
  let wasLast = source[source.length - 1]
  let post = wasLast.post
  if (juicy.test(post)) {
    let punct = post.match(juicy).join('') //not perfect
    let last = needle[needle.length - 1]
    last.post = punct + last.post
    // remove it, from source
    wasLast.post = wasLast.post.replace(juicy, '')
  }
}

const insert = function (str, view, append) {
  const { methods, document, world } = view
  let json = methods.one.tokenize(str, world)
  let needle = json[0] //assume one sentence
  // insert words at end of each doc
  let ptrs = view.fullPointer
  ptrs.forEach(ptr => {
    // add-in the words
    let source = document[ptr[0]]
    needle = clone(needle)
    if (append) {
      addSpace(source)
      // both need a space, when inserting to middle
      if (document[ptr[0]].length > ptr[2]) {
        addSpace(needle) //give needle a space too
      }
      movePunct(source, needle)
      spliceArr(source, ptr[2], needle)
    } else {
      addSpace(needle)
      spliceArr(source, ptr[1], needle)
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
const concat = function (str) {
  const { methods, document, world } = this
  let json = methods.one.tokenize(str, world)
  let ptrs = this.fullPointer
  let lastN = ptrs[ptrs.length - 1][0]
  spliceArr(document, lastN + 1, json)
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
