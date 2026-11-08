import fromHere from './02-from-here.js'

// drop any results that contain this match
const notIf = function (results, not, docs) {
  return results.filter(res => {
    const [n, start, end] = res.pointer
    const terms = docs[n].slice(start, end)
    return !terms.some((_t, i) => fromHere(terms, not, i, terms.length, i) !== null)
  })
}

export default notIf
