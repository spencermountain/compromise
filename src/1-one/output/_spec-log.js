import { red } from '../../API/_color.js'

const logSpec = (doc, slots, failures, aliases) => {
  const terms = doc.docs.flat()
  const wrong = new Set(failures.filter(failure => failure.term).map(failure => failure.term - 1))
  const invalid = new Set(failures.filter(failure => failure.code === 'syntax').map(failure => failure.term - 1))
  const unmatched = failures.some(failure => failure.code === 'match')
  let visible = 0
  terms.forEach((term, i) => {
    if (term.text) {
      visible = i
    }
    // Implicit terms share their visible contraction or number-range token.
    if (wrong.has(i) || i >= slots.length || unmatched) {
      wrong.add(visible)
    }
  })
  const text = terms.map((term, i) => {
    const word = wrong.has(i) && term.text ? red(term.text) : term.text
    return term.pre + word + term.post
  }).join('').trim()
  const tags = slots.map((slot, i) => {
    const term = terms[i]
    if (!term || invalid.has(i) || unmatched) {
      return red(slot.join('|'))
    }
    return slot.map(value => {
      if (value === '.') {
        return value
      }
      const negative = value.startsWith('!')
      const tag = value.replace(/^!?#?/, '')
      const present = term.tags.has(aliases[tag] || tag)
      return present === negative ? red(value) : value
    }).join('|')
  }).join(',')
  const block = slots.length === 0 ? red('{}') : `{${tags}}`
  return `${text} ${block}`
}

export default logSpec
