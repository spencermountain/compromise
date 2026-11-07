import { Past, Pres, Mod, Vb, Inf } from '../../../tagSet/_lib.js'
const verbType = function (terms, i, model, world) {
  const setTag = world.methods.one.setTag
  const term = terms[i]
  const types = [Past, Pres, 'Auxiliary', Mod, 'Particle']
  if (term.tags.has(Vb)) {
    const type = types.find(typ => term.tags.has(typ))
    // is it a bare #Verb tag?
    if (!type) {
      setTag([term], Inf, world, null, `2-verb-type''`)
    }
  }
}
export default verbType