import { setTag } from '../_lib.js'
import { Past, Pres, Mod, Vb, Inf, Aux } from '../../../tagSet/_lib.js'
const verbType = function (terms, i, model, world) {
  const term = terms[i]
  const types = [Past, Pres, Aux, Mod, 'Particle']
  if (term.tags.has(Vb)) {
    const type = types.find(typ => term.tags.has(typ))
    // is it a bare #Verb tag?
    if (!type) {
      setTag([term], Inf, world, `2-verb-type''`)
    }
  }
}
export default verbType