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

const insert = function (str, view, prepend) {
  const { methods, document, world } = view
  let json = methods.one.tokenize(str, world)
  let words = json[0] //assume one sentence
  // insert words at end of each doc
  let ptrs = view.fullPointer
  ptrs.forEach(ptr => {
    // add-in the words
    let all = document[ptr[0]]
    words = clone(words)
    if (prepend) {
      // console.log('=-=-=-= here -=-=-=-')
      spliceArr(all, ptr[1] - 1, words)
    } else {
      spliceArr(all, ptr[1], words)
    }
    // extend the pointer
    ptr[2] += words.length
  })
  // convert them to whole sentences
  ptrs = ptrs.map(a => [a[0]])
  let doc = view.update(ptrs)
  // try to tag them, too
  doc.compute(['preTagger', 'contractions', 'postTagger'])
  return doc
}

const insertAfter = function (str) {
  return insert(str, this, false)
}
const insertBefore = function (str) {
  return insert(str, this, true)
}

export default {
  insertAfter,
  insertBefore,
  append: insertAfter,
  prepend: insertBefore,
  insert: insertAfter,
}
