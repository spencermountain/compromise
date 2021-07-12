import contract from './contract.js'
const titleCase = /^[A-Z][a-z'’\u00C0-\u00FF]/
const toTitleCase = function (str) {
  str = str.replace(/^ *[a-z\u00C0-\u00FF]/, x => x.toUpperCase()) //TODO: support unicode
  return str
}

const plugin = function (world, View) {
  /** */
  class Contractions extends View {
    constructor(document, pointer, groups) {
      super(document, pointer, groups)
      this.viewType = 'Contraction'
    }
    /** i've -> 'i have' */
    expand() {
      this.docs.forEach(terms => {
        let isTitleCase = titleCase.test(terms[0].text)
        terms.forEach((t, i) => {
          t.text = t.implicit
          delete t.implicit
          //add whitespace
          if (i < terms.length - 1 && t.post === '') {
            t.post += ' '
          }
        })
        // make the first word title-case?
        if (isTitleCase) {
          terms[0].text = toTitleCase(terms[0].text)
        }
      })
      return this
    }
  }

  View.prototype.contractions = function () {
    let m = this.match('@hasContraction{2,}')
    return new Contractions(this.document, m.pointer)
  }
  View.prototype.contract = contract
}

export default plugin
