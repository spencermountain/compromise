import data from './_data.js'
import { uncompress, reverse } from 'suffix-thumb'

const fromPast = uncompress(data.PastTense)
const fromPresent = uncompress(data.PresentTense)
const fromGerund = uncompress(data.Gerund)

const toPast = reverse(fromPast)
const toPresent = reverse(fromPresent)
const toGerund = reverse(fromGerund)

export {
  fromPast,
  fromPresent,
  fromGerund,
  toPast,
  toPresent,
  toGerund
}