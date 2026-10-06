import { isMinor } from './_currency.js'

// Numbers already groups multiword values and separates adjacent numeric amounts.
const parts = doc => doc.numbers().map(value => {
  const number = value.not('^and').not('and$')
  if (!number.found) {
    return number
  }
  const amount = number.growRight('#Currency+')
  if (!number.has('#Money') && !amount.has('#Currency')) {
    return number.none()
  }
  return amount.growRight('(pound|pounds)')
})

const find = doc => {
  const pointers = []
  let previous = null
  parts(doc).forEach(amount => {
    const pointer = amount.fullPointer[0]
    const [sentence, start, end] = pointer
    if (previous) {
      const [prevSentence, , prevEnd] = previous.fullPointer[0]
      const gap = doc.document[sentence].slice(prevEnd, start).map(t => t.normal).join(' ')
      if (sentence === prevSentence && start >= prevEnd &&
        (gap === '' || gap === 'and') && isMinor(previous, amount)) {
        const prev = pointers.pop()
        pointers.push([sentence, prev[1], end])
        previous = null
        return
      }
    }
    pointers.push(pointer)
    previous = amount
  })
  return doc.toView(pointers)
}

export { parts }
export default find
