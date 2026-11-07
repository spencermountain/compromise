import select from '../../_select.js'
// return the nth elem of a doc
const apostropheS = /'s$/

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
    constructor(document, pointer, groups) {
      super(document, pointer, groups)
      this.viewType = 'Possessives'
    }
    strip() {
      this.docs.forEach(terms => {
        terms.forEach(term => {
          term.text = term.text.replace(apostropheS, '')
          term.normal = term.normal.replace(apostropheS, '')
        })
      })
      return this
    }
  }

  View.prototype.possessives = select(Possessives, find)
}
export default api
