import toPlural from './toPlural/index.js'
import toSingular from './toSingular/index.js'

const all = function (str, model) {
  const arr = [str]
  const p = toPlural(str, model)
  if (p !== str) {
    arr.push(p)
  }
  const s = toSingular(str, model)
  if (s !== str) {
    arr.push(s)
  }
  return arr
}

export default { toPlural, toSingular, all }
