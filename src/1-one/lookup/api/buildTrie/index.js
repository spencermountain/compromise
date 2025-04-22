// edited by Spencer Kelly
// credit to https://github.com/BrunoRB/ahocorasick by Bruno Roberto Búrigo.

const tokenize = function (phrase, world) {
  const { methods, model } = world
  const terms = methods.one.tokenize.splitTerms(phrase, model).map(t => methods.one.tokenize.splitWhitespace(t, model))
  return terms.map(term => term.text.toLowerCase())
}

// turn an array or object into a compressed aho-corasick structure
const buildTrie = function (phrases, world) {

  // const tokenize=methods.one.
  const goNext = [{}]
  const endAs = [null]
  const failTo = [0]

  const xs = []
  let n = 0
  phrases.forEach(function (phrase) {
    let curr = 0
    // let wordsB = phrase.split(/ /g).filter(w => w)
    const words = tokenize(phrase, world)
    for (let i = 0; i < words.length; i++) {
      const word = words[i]
      if (goNext[curr] && goNext[curr].hasOwnProperty(word)) {
        curr = goNext[curr][word]
      } else {
        n++
        goNext[curr][word] = n
        goNext[n] = {}
        curr = n
        endAs[n] = null
      }
    }
    endAs[curr] = [words.length]
  })
  // f(s) = 0 for all states of depth 1 (the ones from which the 0 state can transition to)
  for (const word in goNext[0]) {
    n = goNext[0][word]
    failTo[n] = 0
    xs.push(n)
  }

  while (xs.length) {
    const r = xs.shift()
    // for each symbol a such that g(r, a) = s
    const keys = Object.keys(goNext[r])
    for (let i = 0; i < keys.length; i += 1) {
      const word = keys[i]
      const s = goNext[r][word]
      xs.push(s)
      // set state = f(r)
      n = failTo[r]
      while (n > 0 && !goNext[n].hasOwnProperty(word)) {
        n = failTo[n]
      }
      if (goNext.hasOwnProperty(n)) {
        const fs = goNext[n][word]
        failTo[s] = fs
        if (endAs[fs]) {
          endAs[s] = endAs[s] || []
          endAs[s] = endAs[s].concat(endAs[fs])
        }
      } else {
        failTo[s] = 0
      }
    }
  }
  return { goNext, endAs, failTo }
}
export default buildTrie

// console.log(buildTrie(['smart and cool', 'smart and nice']))
