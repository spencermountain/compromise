import { isMinor, decimalName, codes, currencyMatch } from './_currency.js'
import { tagCents, isCandidate } from './_candidates.js'

// reach for the currency words around a number
const grow = m => m.growRight(currencyMatch + '+').growLeft(codes)

// Numbers already groups multiword values and separates adjacent numeric amounts.
const parts = doc => {
  // Normalization turns prefix ¢ into c, hiding its monetary spelling.
  tagCents(doc)
  return doc.numbers().map(value => {
    if (!isCandidate(value)) {
      return value.none()
    }
    let number = value.not('^and').not('and$')
    if (number.text('reduced') === 'minus') {
      return number.none()
    }
    number = number.growLeft('minus')
    if (!number.found) {
      return number
    }
    let amount = grow(number)
    const [sentence, start, end] = number.fullPointer[0]
    const next = number.document[sentence][end]
    const configured = next && decimalName(next.normal, number.world)
    if (configured) {
      amount = grow(number.toView([[sentence, start, end + 1]]))
    }
    if (!configured && !number.has('#Money') && !amount.has(currencyMatch) && !number.text().includes('¢')) {
      return number.none()
    }
    return amount.growRight('(pound|pounds)').growRight(codes)
  })
}

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
  let number = amount.not(currencyMatch).not('(pound|pounds)$')
  const last = number.lastTerm()
  if (decimalName(last.text('normal'), amount.world)) {
    number = number.not(last)
  }
  return number
}

export { parts, numberOf }
export default find
