import select from '../../_select.js'
// return the nth elem of a doc
const apostropheS = /'s$/

const find = function (doc) {
  let m = doc.match('#Possessive+')
  // expand it to include 'john smith's'
  if (m.has('#Person')) {
    m = m.growLeft('#Person+')
  }
  if (m.has('#Place')) {
    m = m.growLeft('#Place+')
  }
  if (m.has('#Organization')) {
    m = m.growLeft('#Organization+')
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
