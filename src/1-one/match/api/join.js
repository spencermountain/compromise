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

// un-split two neighbouring words, if they both match
const joinIf = function (lMatch, rMatch) {
  const world = this.world
  const parseMatch = world.methods.one.parseMatch
  lMatch = lMatch || '.$' //defaults
  rMatch = rMatch || '^.'
  let leftMatch = parseMatch(lMatch, {}, world)
  let rightMatch = parseMatch(rMatch, {}, world)
  let ptrs = this.fullPointer

  // start looking for
  let res = []
  for (let i = 0; i < ptrs.length - 1; i += 1) {
    let ptrL = ptrs[i]
    let ptrR = ptrs[i + 1]
    // ensure two matches are neighbours
    if (!ptrL || !ptrR || !isNeighbour(ptrL, ptrR)) {
      continue
    }
    let left = this.update([ptrL])
    let right = this.update([ptrR])
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
  return this.update(res)
}
export default { joinIf }
