const reason = 'european-number'
// '€', '₽', 'R$', 'US$'
const symbol = /^[a-z]{0,2}\p{Sc}$/iu
// only in capitals - 'EUR 5', not 'eur'
const codes = /^(?:EUR|USD|GBP|CHF|JPY|CAD|AUD|BRL|MXN|RUB|CNY)$/
const percent = /^[%％]$/

const isValue = term => term.tags.has('Value')
// nothing but a space between this word and the next - not '5, euro'
const touches = term => /^\s*$/.test(term.post)

// do these words come next? - 'per cento'
const hasPhrase = function (terms, i, words) {
  return words.every((w, o) => terms[i + o] && terms[i + o].normal === w && (o === words.length - 1 || touches(terms[i + o])))
}

/**
 * a number takes its meaning from the word beside it - '5,30 €', '50 per cento', 'mille euro'.
 * the number is tagged #Money or #Percent, and the word beside it #Currency or #Unit.
 * the words come from the model - { percent: ['per cento'], currencies: ['euro'] }
 */
const tagNeighbours = function (terms, view) {
  const { world, model, methods } = view
  const { setTag, unTag } = methods.one
  const locale = model.two.europeanNumbers
  const phrases = (locale.percent || []).map(str => str.split(' '))
  const words = new Set(locale.currencies || [])
  const isCurrency = term => term.tags.has('Currency') || symbol.test(term.text) || words.has(term.normal)
  const isCode = term => symbol.test(term.text) || codes.test(term.text)

  for (let i = 0; i < terms.length; i += 1) {
    if (!isValue(terms[i]) || terms[i].tags.has('Ordinal')) {
      continue
    }
    // the whole number - '1 000', 'trois cent'
    let end = i
    while (terms[end + 1] && isValue(terms[end + 1]) && touches(terms[end])) {
      end += 1
    }
    const run = terms.slice(i, end + 1)
    const next = touches(terms[end]) ? terms[end + 1] : null
    const before = terms[i - 1]
    const phrase = next ? phrases.find(a => hasPhrase(terms, end + 1, a)) : null
    if (phrase) {
      // 'cento' is not a second number
      const unit = terms.slice(end + 1, end + 1 + phrase.length)
      unTag(unit, 'Value', model.one.tagSet)
      setTag(unit, 'Unit', world, false, reason)
      setTag(run, 'Percent', world, false, reason)
      end += phrase.length
    } else if (next && percent.test(next.text)) {
      setTag(run, 'Percent', world, false, reason)
      setTag([next], 'Unit', world, false, reason)
    } else if (next && (isCurrency(next) || codes.test(next.text))) {
      setTag(run, 'Money', world, false, reason)
      setTag([next], 'Currency', world, false, reason)
    } else if (before && isCode(before) && touches(before)) {
      // only a symbol goes in front - '€ 5,30', 'CHF 12'
      setTag(run, 'Money', world, false, reason)
      setTag([before], 'Currency', world, false, reason)
    }
    i = end
  }
}
export default tagNeighbours
