// for each cached-sentence, find a list of possible matches
const getHooks = function (docCaches, hooks) {
  return docCaches.map((set, i) => {
    let maybe = []
    Object.keys(hooks).forEach(k => {
      if (docCaches[i].has(k)) {
        maybe = maybe.concat(hooks[k])
      }
    })
    // remove duplicates
    const already = new Set()
    maybe = maybe.filter(m => {
      if (already.has(m)) {
        return false
      }
      already.add(m)
      return true
    })
    return maybe
  })
}

export default getHooks
