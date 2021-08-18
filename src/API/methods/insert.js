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
      // are we inserting into the middle?
      if (document[ptr[0]].length > ptr[2]) {
        addSpace(needle) //give needle a space too
      }
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

export default {
  insertAfter,
  insertBefore,
  append: insertAfter,
  prepend: insertBefore,
  insert: insertAfter,
}
