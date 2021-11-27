const pointerFromTerms = function (docs) {
  let ptr = []
  docs.forEach(terms => {
    let [n, start] = terms[0].index
    let [_, end] = terms[terms.length - 1].index
    ptr.push([n, start, end + 1])
  })
  return ptr
}
export default pointerFromTerms
