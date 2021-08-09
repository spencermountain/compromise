// splice an array into an array
const spliceArr = (parent, index, child) => {
  let args = [index, 0].concat(child)
  Array.prototype.splice.apply(parent, args)
  return parent
}

const clone = function (terms) {
  return terms.slice().map(obj => Object.assign({}, obj))
}

const insertAfter = function (str) {
  const { methods, model, document } = this
  let json = methods.one.tokenize(str, { methods, model })
  let words = json[0] //assume one sentence
  // insert words at end of each doc
  let ptrs = this.fullPointer
  ptrs.forEach(ptr => {
    // add-in the words
    let all = document[ptr[0]]
    words = clone(words)
    spliceArr(all, ptr[1], words)
    // extend the pointer
    ptr[2] += words.length
  })
  // console.log(ptrs)
  // docs.forEach(terms => {})
  // console.log(docs)
  // console.log(json)
}

export default {
  insertAfter,
}
