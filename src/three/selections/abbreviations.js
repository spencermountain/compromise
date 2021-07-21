import View from '../../View.js'
/** */
class Abbreviations extends View {
  constructor(document, pointer, groups) {
    super(document, pointer, groups)
    this.viewType = 'Abbreviations'
  }
  stripPeriods() {
    let { termNormalize } = this.methods.tokenize
    this.termList().forEach(t => {
      if (t.tags.has('Abbreviation') === true) {
        // don't remove a final period here
        t.post = t.post.replace(/^\./, '')
      }
      let str = t.text.replace(/\./, '')
      t.text = str
      t.normal = termNormalize(str)
    })
    return this
  }
  addPeriods() {
    this.termList().forEach(t => {
      t.post = t.post.replace(/^\./, '')
      t.post = '.' + t.post
    })
    return this
  }
}
export default Abbreviations
