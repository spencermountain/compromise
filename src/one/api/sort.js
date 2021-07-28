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
      normal: terms.map(t => t.normal || t.implicit || '').join(' '),
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

/** reverse the order of the matches, but not the words */
const reverse = function () {
  let ptrs = this.pointer || this.docs.map((_d, n) => [n])
  ptrs = [].concat(ptrs)
  ptrs = ptrs.reverse()
  return this.update(ptrs)
}

/** remove any duplicate matches */
const unique = function () {
  let { docs, pointer } = this
  let ptrs = pointer || docs.map((_d, n) => [n])
  let already = new Set()
  let toRemove = new Set()
  this.docs.forEach((terms, n) => {
    let txt = terms.map(t => t.normal || t.implicit).join(' ')
    if (already.has(txt)) {
      toRemove.add(n)
    }
    already.add(txt)
  })
  ptrs = ptrs.filter((_a, n) => toRemove.has(n) === false)
  return this.update(ptrs)
}

export default { unique, reverse, sort }
