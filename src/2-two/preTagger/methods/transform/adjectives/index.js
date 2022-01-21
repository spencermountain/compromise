import { convert } from 'suffix-thumb'

const adjToSuperlative = function (adj, model) {
  const mod = model.two.models.toSuperlative
  return convert(adj, mod)
}
const adjToComparative = function (adj, model) {
  const mod = model.two.models.toComparative
  return convert(adj, mod)
}
const adjFromComparative = function (adj, model) {
  const mod = model.two.models.fromComparative
  return convert(adj, mod)
}
const adjFromSuperlative = function (adj, model) {
  const mod = model.two.models.fromSuperlative
  return convert(adj, mod)
}

export {
  adjToSuperlative, adjToComparative, adjFromComparative, adjFromSuperlative
}
