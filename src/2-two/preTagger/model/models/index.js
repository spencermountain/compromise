import data from '../../../_built/conjugations.js'
import { reverse, uncompress } from 'suffix-thumb'
// verb models are stored infinitive-wards, adjective models are stored away from the adjective
const fromVerb = { Past: data.PastTense, Present: data.PresentTense, Gerund: data.Gerund, Participle: data.Participle }
const toAdj = { Comparative: data.Comparative, Superlative: data.Superlative }

const models = {}
Object.keys(fromVerb).forEach(k => {
  models['from' + k] = uncompress(fromVerb[k])
})
Object.keys(fromVerb).forEach(k => {
  models['to' + k] = reverse(models['from' + k])
})
// adjectives
Object.keys(toAdj).forEach(k => {
  models['to' + k] = uncompress(toAdj[k])
})
Object.keys(toAdj).forEach(k => {
  models['from' + k] = reverse(models['to' + k])
})
models.adjToNoun = uncompress(data.AdjToNoun)

export default models
// console.log(convert('collide', toPast))
