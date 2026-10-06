import parse from './parse/index.js'

const toFraction = percentages => {
  const result = percentages.map(value => {
    const { num } = parse(value)
    if (!Number.isFinite(num)) {
      return value
    }
    // Include a spelled-out unit, while keeping the numeric parse separate.
    const phrase = value.growRight('(percent|percentage|per cent)')
    // A leading decimal point is stored as pre-punctuation.
    const first = phrase.docs[0][0]
    if (/\.$/.test(first.pre) && /^\d/.test(first.text)) {
      first.pre = first.pre.slice(0, -1)
    }
    phrase.replaceWith(`${num}/100`)
    phrase.unTag('Percent').tag(['Fraction', 'NumericValue'])
    return phrase
  })
  return result.fractions()
}

export default toFraction
