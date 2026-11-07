import eachTerm from './_lib.js'

// sort words by frequency
const freq = function (view) {
  const docs = view.docs
  const counts = Object.create(null)
  eachTerm(docs, term => {
    const word = term.machine || term.normal
    counts[word] ??= 0
    counts[word] += 1
  })
  // add counts on each term
  eachTerm(docs, term => {
    term.freq = counts[term.machine || term.normal]
  })
}
export default freq
