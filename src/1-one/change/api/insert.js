import { cleanAppend, cleanPrepend, spliceArr } from './lib/insert.js'

const insert = function (str, view, prepend) {
  const { methods, document, world } = view
  // insert words at end of each doc
  let ptrs = view.fullPointer
  let selfPtrs = view.fullPointer
  // are we inserting inside a contraction?
  // expand, it first
  if (view.has('@hasContraction')) {
    let more = view.grow('@hasContraction')
    more.contractions().expand()
  }
  ptrs.forEach((ptr, i) => {
    let [n] = ptr
    // add-in the words
    let home = document[n]
    let needle = []
    if (typeof str === 'string') {
      needle = methods.one.tokenize(str, world)[0] //assume one sentence
    } else if (typeof str === 'object' && str.docs) {
      needle = str.docs[0] //assume one sentence
    }
    if (prepend) {
      cleanPrepend(home, ptr, needle, document)
    } else {
      cleanAppend(home, ptr, needle, document)
    }
    // change self backwards by len
    selfPtrs[i] = ptr
    // extend the pointer
    ptr[2] += needle.length
  })
  // convert them to whole sentences
  // ptrs = ptrs.map(a => [a[0]])
  let doc = view.toView(ptrs)
  // shift our self pointer, if necessary
  view.ptrs = selfPtrs
  // try to tag them, too
  doc.compute(['index', 'lexicon', 'preTagger'])
  return doc
}

const fns = {
  insertAfter: function (input) {
    return insert(input, this, false)
  },
  insertBefore: function (input) {
    return insert(input, this, true)
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
      return this.compute('index')
    }
    // is it other pointers from the same document?
    if (this.document === input.document) {
      let ptrs = this.fullPointer.concat(input.fullPointer)
      return this.toView(ptrs).compute('index')
    }
    return this
  },
}
fns.append = fns.insertAfter
fns.prepend = fns.insertBefore
fns.insert = fns.insertAfter

export default fns
