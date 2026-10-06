import { isMinor, decimalName } from './_currency.js'

// Numbers already groups multiword values and separates adjacent numeric amounts.
const parts = doc => {
  // Normalization turns prefix ¢ into c, hiding its monetary spelling.
  doc.terms().filter(term => /^¢[0-9]/.test(term.text())).tag(['Money', 'Value'])
  return doc.numbers().map(value => {
    let number = value.not('^and').not('and$')
    if (number.text('reduced') === 'minus') {
      return number.none()
    }
    number = number.growLeft('minus')
    if (!number.found) {
      return number
    }
    let amount = number.growRight('(#Currency|cad|usd)+').growLeft('(cad|usd)')
    const [sentence, start, end] = number.fullPointer[0]
    const next = number.document[sentence][end]
    const configured = next && decimalName(next.normal, number.world)
    if (configured) {
      amount = number.toView([[sentence, start, end + 1]]).growRight('(#Currency|cad|usd)+').growLeft('(cad|usd)')
    }
    if (!configured && !number.has('#Money') && !amount.has('(#Currency|cad|usd)') && !number.text().includes('¢')) {
      return number.none()
    }
    return amount.growRight('(pound|pounds)').growRight('(cad|usd)')
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
  let number = amount.not('(#Currency|cad|usd)').not('(pound|pounds)$')
  const last = number.lastTerm()
  if (decimalName(last.text('normal'), amount.world)) {
    number = number.not(last)
  }
  return number
}

export { parts, numberOf }
export default find
