// edited by Spencer Kelly
// credit to https://github.com/BrunoRB/ahocorasick by Bruno Roberto Búrigo.

// object v. array
const isObject = function(obj) {
  return obj && Object.prototype.toString.call(obj) === '[object Object]'
}

// turn an array or object into a compressed aho-corasick structure
const buildTrie = function(keywords) {
  let values = []
  const isObj = isObject(keywords)
  if (isObj === true) {
    keywords = Object.keys(keywords).map(k => {
      values.push(keywords[k])
      return k
    })
  }
  let gotoFn = {
    0: {},
  }
  let output = {}

  let state = 0
  keywords.forEach(function(word, w) {
    let value = true
    if (values[w] !== undefined) {
      value = values[w]
    }
    let curr = 0
    let words = word.split(/ /g)
    for (let i = 0; i < words.length; i++) {
      let l = words[i]
      if (gotoFn[curr] && l in gotoFn[curr]) {
        curr = gotoFn[curr][l]
      } else {
        state++
        gotoFn[curr][l] = state
        gotoFn[state] = {}
        curr = state
        output[state] = []
      }
    }

    output[curr] = [{ len: words.length, value: value }]
  })

  let failure = {}
  let xs = []

  // f(s) = 0 for all states of depth 1 (the ones from which the 0 state can transition to)
  for (let l in gotoFn[0]) {
    state = gotoFn[0][l]
    failure[state] = 0
    xs.push(state)
  }

  while (xs.length) {
    let r = xs.shift()
    // for each symbol a such that g(r, a) = s
    for (let l in gotoFn[r]) {
      let s = gotoFn[r][l]
      xs.push(s)

      // set state = f(r)
      state = failure[r]
      while (state > 0 && !(l in gotoFn[state])) {
        state = failure[state]
      }

      if (l in gotoFn[state]) {
        let fs = gotoFn[state][l]
        failure[s] = fs
        output[s] = output[s].concat(output[fs])
      } else {
        failure[s] = 0
      }
    }
  }
  return {
    isObj: isObj,
    gotoFn: gotoFn,
    output: output,
    failure: failure,
  }
}
module.exports = buildTrie
