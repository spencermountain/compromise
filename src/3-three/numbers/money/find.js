import { isMinor, decimalName } from './_currency.js'

// Numbers already groups multiword values and separates adjacent numeric amounts.
const parts = doc => doc.numbers().map(value => {
  let number = value.not('^and').not('and$')
  if (number.text('reduced') === 'minus') {
    return number.none()
  }
  number = number.growLeft('minus')
  if (!number.found) {
    return number
  }
  let amount = number.growRight('#Currency+')
  const [sentence, start, end] = number.fullPointer[0]
  const next = number.document[sentence][end]
  const configured = next && decimalName(next.normal, number.world)
  if (configured) {
    amount = number.toView([[sentence, start, end + 1]]).growRight('#Currency+')
  }
  if (!configured && !number.has('#Money') && !amount.has('#Currency') && !number.text().includes('¢')) {
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

const numberOf = amount => {
  let number = amount.not('#Currency').not('(pound|pounds)$')
  const last = number.lastTerm()
  if (decimalName(last.text('normal'), amount.world)) {
    number = number.not(last)
  }
  return number
}

export { parts, numberOf }
export default find
