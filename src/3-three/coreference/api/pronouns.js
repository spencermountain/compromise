import select from '../../_select.js'
import keepClass from '../../_lib.js'
const api = function (View) {

  class Pronouns extends View {
    hasReference() {
      this.compute('coreference')
      return this.filter(m => {
        const term = m.docs[0][0]
        return term.reference
      })
    }
    // get the noun-phrase this pronoun refers to
    refersTo() {
      //calculate links
      this.compute('coreference')
      // return them
      return this.map(m => {
        if (!m.found) {
          return m.none()
        }
        const term = m.docs[0][0]
        if (term.reference) {
          return m.update([term.reference])
        }
        return m.none()
      })
    }
  }
  keepClass(Pronouns, 'Pronouns')

  View.prototype.pronouns = select(Pronouns, '#Pron')
}
export default api
