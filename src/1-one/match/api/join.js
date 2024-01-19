// check if two pointers are perfectly consecutive
const isNeighbour = function (ptrL, ptrR) {
  if (!ptrL || !ptrR || ptrL.length !== ptrR.length) {
    return false
  }
  // same sentence
  if (ptrL[0] !== ptrR[0]) {
    return false
  }
  // ensure R starts where L ends
  return ptrL[2] === ptrR[1]
}

// join two neighbouring words, if they both match
const mergeIf = function (doc, lMatch, rMatch) {
  const world = doc.world
  const parseMatch = world.methods.one.parseMatch
  lMatch = lMatch || '.$' //defaults
  rMatch = rMatch || '^.'
  let leftMatch = parseMatch(lMatch, {}, world)
  let rightMatch = parseMatch(rMatch, {}, world)
  let ptrs = doc.fullPointer

  // start looking for
  let res = []
  for (let i = 0; i < ptrs.length; i += 1) {
    let ptrL = ptrs[i]
    let ptrR = ptrs[i + 1]
    // ensure two matches are neighbours
    if (!ptrL || !ptrR || !isNeighbour(ptrL, ptrR)) {
      res.push(ptrL)
      continue
    }
    let left = doc.update([ptrL])
    let right = doc.update([ptrR])
    // ensure both sides pass given criteria
    if (left.has(leftMatch) && right.has(rightMatch)) {
      // merge these two pointers
      let ptr = [ptrL[0], ptrL[1], ptrR[2]]
      // console.log('👍', left.text(), right.text())
      // console.log(this.update([ptr]).text())
      res.push(ptr)
      ptrs[i + 1] = null
      continue
    }
    // keep this existing pointer
    res.push(ptrL)
  }
  // return new pointers
  return doc.update(res)
}

const methods = {
  //  merge only if conditions are met
  joinIf: function (lMatch, rMatch) {
    return mergeIf(this, lMatch, rMatch)
  },
  // merge all neighbouring matches
  join: function () {
    return mergeIf(this)
  },
}
export default methods
