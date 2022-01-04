import { convert } from 'suffix-thumb'

const adjToSuperlative = function (adj, model) {
  const toSuper = model.two.models.toSuperlative
  return convert(adj, toSuper)
}
const adjToComparative = function (adj, model) {
  const toComp = model.two.models.toComparative
  return convert(adj, toComp)
}

export {
  adjToSuperlative, adjToComparative
}
