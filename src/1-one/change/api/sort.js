import methods from './lib/_sort.js'
// aliases
const seqNames = new Set(['index', 'sequence', 'seq', 'sequential', 'chron', 'chronological'])
const freqNames = new Set(['freq', 'frequency', 'topk', 'repeats'])

/** re-arrange the order of the matches (in place) */
const sort = function (input) {
  let { docs, pointer } = this
  input = input || 'alpha'
  let ptrs = pointer || docs.map((_d, n) => [n])
  let arr = docs.map((terms, n) => {
    return {
      index: n,
      words: terms.length,
      normal: terms.map(t => t.machine || t.normal || '').join(' '),
      pointer: ptrs[n],
    }
  })
  // // 'chronological' sorting
  if (seqNames.has(input)) {
    input = 'sequential'
  }
  if (freqNames.has(input)) {
    arr = methods.byFreq(arr)
    return this.update(arr.map(o => o.pointer))
  }
  // apply sort method on each phrase
  if (typeof methods[input] === 'function') {
    arr = arr.sort(methods[input])
    return this.update(arr.map(o => o.pointer))
  }
  return this
}

/** reverse the order of the matches, but not the words or index */
const reverse = function () {
  let ptrs = this.pointer || this.docs.map((_d, n) => [n])
  ptrs = [].concat(ptrs)
  ptrs = ptrs.reverse()
  return this.update(ptrs)
}

/** remove any duplicate matches */
const unique = function () {
  let already = new Set()
  let res = this.filter(m => {
    let txt = m.text('normal')
    if (already.has(txt)) {
      return false
    }
    already.add(txt)
    return true
  })
  // this.ptrs = res.ptrs //mutate original?
  return res//.compute('index')
}

export default { unique, reverse, sort }
