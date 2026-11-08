import eachTerm from '../tokenize/compute/_lib.js'
const freeze = function (view) {
  const world = view.world
  const { model, methods } = view.world
  const setTag = methods.one.setTag
  const { frozenLex } = model.one
  const multi = model.one._multiCache || {}

  eachTerm(view.docs, (t, terms, i) => {
    // basic lexicon lookup
    const word = t.machine || t.normal

    // test a multi-word
    if (multi[word] !== undefined && terms[i + 1]) {
      const end = i + multi[word] - 1
      for (let k = end; k > i; k -= 1) {
        const words = terms.slice(i, k + 1)
        const str = words.map(term => term.machine || term.normal).join(' ')
        // lookup frozen lexicon
        if (Object.hasOwn(frozenLex, str)) {
          setTag(words, frozenLex[str], world, false, '1-frozen-multi-lexicon')
          words.forEach(term => (term.frozen = true))
        }
      }
    }
    // test single word
    if (frozenLex[word] !== undefined && Object.hasOwn(frozenLex, word)) {
      setTag([t], frozenLex[word], world, false, '1-freeze-lexicon')
      t.frozen = true
    }
  })
}

const unfreeze = function (view) {
  eachTerm(view.docs, term => {
    delete term.frozen
  })
  return view
}
export default { frozen: freeze, freeze, unfreeze }
