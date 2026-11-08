import select from '../../_select.js'
import stripper from '../_lib.js'
import eachTerm from '../../../1-one/tokenize/compute/_lib.js'
const stripS = stripper(/['’]s$/)
const leadApostrophe = /^['’]/

// spencer's, spencer’s - and the flanders', whose apostrophe is in .post
const strip = function (view) {
  stripS(view)
  eachTerm(view.docs, t => {
    if (t.text.endsWith('s') && leadApostrophe.test(t.post)) {
      t.post = t.post.replace(leadApostrophe, '')
    }
  })
  return view
}

// #Possessive is decided upstream, in steps - the list is in 2-two/contraction-two/compute/index.js
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
