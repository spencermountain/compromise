import { infinitive, inflect } from './inflect.js'
import { isAreAm } from '../lib.js'
import convertAuxiliary from './auxiliary.js'
import parseVerb from '../parse/index.js'
const keep = { tags: true }

// all verb forms are the same
const toGerund = function (vb, parsed, form) {
  const converted = convertAuxiliary(vb, parsed, form, 'gerund')
  if (converted) return converted
  if (vb.has('#Gerund')) {
    return vb
  }
  vb.growLeft('@hasContraction+').contractions().expand()
  parsed = parseVerb(vb)
  const { root, auxiliary } = parsed

  // conjugate '-ing' verb
  const str = infinitive(root)
  const gerund = inflect(root, 'Gerund')
  // 'are walking', 'is walking'
  if (gerund) {
    const aux = isAreAm(vb, parsed)
    if (str === 'be' && !auxiliary.found && parsed.negative.found) {
      vb.replace(root, aux)
      vb.match(parsed.negative).insertAfter(gerund)
    } else {
      vb.replace(root, gerund, keep)
      vb.remove(auxiliary)
      vb.prepend(aux)
    }
  }

  vb.replace('not is', 'is not')
  vb.replace('not are', 'are not')
  vb.fullSentence().compute(['tagger', 'chunks'])
  return vb
}
export default toGerund
