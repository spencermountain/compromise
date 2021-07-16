const plugin = function (world, View) {
  let { termNormalize } = world.methods.tokenize

  /** */
  class Abbreviations extends View {
    constructor(document, pointer, groups) {
      super(document, pointer, groups)
      this.viewType = 'Abbreviations'
    }
    stripPeriods() {
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

  View.prototype.abbreviations = function (n) {
    let m = this.match('#Abbreviation')
    if (typeof n === 'number') {
      m = m.get(n)
    }
    return new Abbreviations(this.document, m.pointer)
  }
}
export default plugin
