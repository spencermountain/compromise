import { cleanAppend, cleanPrepend, spliceArr } from '../../../API/methods/lib/insert.js'

const insert = function (str, view, prepend) {
  const { methods, document, world } = view
  // insert words at end of each doc
  let ptrs = view.fullPointer
  ptrs.forEach(ptr => {
    let [n] = ptr
    // add-in the words
    let home = document[n]
    let needle = methods.one.tokenize(str, world)[0] //assume one sentence
    if (prepend) {
      cleanPrepend(home, ptr, needle, document)
    } else {
      cleanAppend(home, ptr, needle, document)
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

const fns = {
  insertAfter: function (str) {
    return insert(str, this, false)
  },
  insertBefore: function (str) {
    return insert(str, this, true)
  },
  // add string as new sentence
  concat: function (input) {
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
      let ptrs = this.fullPointer.concat(input.fullPointer)
      return this.update(ptrs)
    }
    return this
  },
}
fns.append = fns.insertAfter
fns.prepend = fns.insertBefore
fns.insert = fns.insertAfter

export default fns
