import select from '../../_select.js'
import stripper from '../_lib.js'
const strip = stripper(/'s$/)

const find = function (doc) {
  let m = doc.match('#Poss+')
  // expand it to include 'john smith's'
  if (m.has('#Pers')) {
    m = m.growLeft('#Pers+')
  }
  if (m.has('#Place')) {
    m = m.growLeft('#Place+')
  }
  if (m.has('#Org')) {
    m = m.growLeft('#Org+')
  }
  return m
}


const api = function (View) {

  class Possessives extends View {
    strip() {
      return strip(this)
    }
  }
  Possessives.prototype.viewType = 'Possessives'

  View.prototype.possessives = select(Possessives, find)
}
export default api
