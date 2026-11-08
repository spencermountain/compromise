import { infinitive, inflect } from './inflect.js'
import { isAreAm, retag } from '../lib.js'
import convertAuxiliary from './auxiliary.js'
import parseVerb from '../parse/index.js'
import { Ger } from '../../../../2-two/preTagger/tagSet/_lib.js'
import { keepTags as keep } from '../../../_lib.js'

// all verb forms are the same
const toGerund = function (vb, parsed, form) {
  const converted = convertAuxiliary(vb, parsed, form, 'gerund')
  if (converted) return converted
  if (vb.has('#Ger')) {
    return vb
  }
  vb.growLeft('@hasContraction+').contractions().expand()
  parsed = parseVerb(vb)
  const { root, auxiliary } = parsed

  // conjugate '-ing' verb
  const str = infinitive(root)
  const gerund = inflect(root, Ger)
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
  retag(vb)
  return vb
}
export default toGerund
