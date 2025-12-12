import fromHere from './02-from-here.js'

const notIf = function (results, not, docs) {
  results = results.filter(res => {
    const [n, start, end] = res.pointer
    const terms = docs[n].slice(start, end)
    for (let i = 0; i < terms.length; i += 1) {
      const slice = terms.slice(i)
      const found = fromHere(slice, not, i, terms.length)
      if (found !== null) {
        return false
      }
    }
    return true
  })
  return results
}

export default notIf