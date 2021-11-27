
const sameTerm = function (a, b) {
  if (!a || !b) {
    return false
  }
  return a.normal === b.normal
}

const getPtrs = function (view) {
  const { methods, frozen, ptrs, document } = view
  let frznPtr = methods.one.pointerFromTerms(frozen)
  // let docs = methods.one.getDoc(ptrs, document)
  // remove any results that no-longer line-up
  // console.log(docs)
  // console.log('====')
  // console.log(frozen)
  // frznPtr = frznPtr.filter((p, n) => {
  //   // check that every term is vaguly the same
  //   return docs[n] && docs[n].every((term, i) => sameTerm(term, frozen[n][i]))
  // })
  return frznPtr
}

export { getPtrs }
