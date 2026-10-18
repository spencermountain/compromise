import { decimalName } from './_currency.js'

const isQualifier = word => word === 'cad' || word === 'usd'

// Inspect terms directly instead of constructing a View for every word.
const tagCents = doc => {
  if (doc.docs.some(terms => terms.some(term => term.text.includes('¢') || term.pre.includes('¢')))) {
    doc.terms().filter(term => /^¢[0-9]/.test(term.text())).tag(['Money', 'Value'])
  }
}

// Keep number segmentation unchanged; reject only phrases without currency clues.
const isCandidate = value => {
  const [sentence, start, end] = value.fullPointer[0]
  const terms = value.document[sentence]
  // Include a leading minus and currencies just outside the selection.
  for (let i = Math.max(0, start - 2); i < Math.min(terms.length, end + 1); i += 1) {
    const term = terms[i]
    if (term.tags.has('Money') || term.tags.has('Currency') ||
      isQualifier(term.normal) || isQualifier(term.machine) || isQualifier(term.text) ||
      term.alias?.some(isQualifier) || (term.pre + term.text + term.post).includes('¢') ||
      decimalName(term.normal, value.world)) {
      return true
    }
  }
  return false
}

export { tagCents, isCandidate }
