import data from './_data.js'
import { uncompress, reverse } from 'suffix-thumb'

const fromPast = uncompress(data.PastTense)
const fromPresent = uncompress(data.PresentTense)
const fromGerund = uncompress(data.Gerund)
const fromParticiple = uncompress(data.Participle)

const toPast = reverse(fromPast)
const toPresent = reverse(fromPresent)
const toGerund = reverse(fromGerund)
const toParticiple = reverse(fromParticiple)

export {
  fromPast,
  fromPresent,
  fromGerund,
  fromParticiple,
  toPast,
  toPresent,
  toGerund,
  toParticiple
}