// edited by Spencer Kelly
// credit to https://github.com/BrunoRB/ahocorasick by Bruno Roberto Búrigo.

// turn an array or object into a compressed aho-corasick structure
const buildTrie = function (keywords) {
  let goNext = [{}]
  let endOn = [null]
  let failTo = [null]

  let xs = []
  let n = 0
  keywords.forEach(function (word, w) {
    let curr = 0
    let words = word.split(/ /g).filter(w => w)
    for (let i = 0; i < words.length; i++) {
      let word = words[i]
      if (goNext[curr] && goNext[curr].hasOwnProperty(word)) {
        curr = goNext[curr][word]
      } else {
        n++
        goNext[curr][word] = n
        goNext[n] = {}
        curr = n
        endOn[n] = null
      }
    }
    endOn[curr] = [words.length]
  })

  // f(s) = 0 for all states of depth 1 (the ones from which the 0 state can transition to)
  for (let word in goNext[0]) {
    n = goNext[0][word]
    failTo[n] = 0
    xs.push(n)
  }

  while (xs.length) {
    let r = xs.shift()
    // for each symbol a such that g(r, a) = s
    for (let word in goNext[r]) {
      let s = goNext[r][word]
      xs.push(s)
      // set state = f(r)
      n = failTo[r]
      while (n > 0 && !goNext[n].hasOwnProperty(word)) {
        n = failTo[n]
      }
      if (word in goNext[n]) {
        let fs = goNext[n][word]
        failTo[s] = fs
        if (endOn[fs]) {
          endOn[s] = endOn[s] || []
          endOn[s] = endOn[s].concat(endOn[fs])
        }
      } else {
        failTo[s] = 0
      }
    }
  }
  return { goNext, endOn, failTo, }
}
export default buildTrie

// console.log(buildTrie(['smart and cool', 'smart and nice']))
