import { getTense } from '../lib.js'

// Inflect the lexical root only, using its existing tags to disambiguate tense.
export const infinitive = (root, format = 'normal') => {
  return root.methods.two.transform.verb.toInfinitive(root.text(format), root.model, getTense(root))
}

export const inflect = (root, tense, format) => {
  const word = infinitive(root, format)
  if (tense === 'Infinitive') return word
  const forms = root.methods.two.transform.verb.conjugate(word, root.model)
  return forms[tense] || (tense === 'Participle' ? forms.PastTense : undefined)
}
