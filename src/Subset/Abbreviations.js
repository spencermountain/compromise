const addMethod = function (Doc) {
  /**  */
  class Abbreviations extends Doc {
    stripPeriods() {
      this.termList().forEach(t => {
        if (t.tags.Abbreviation === true && t.next) {
          t.post = t.post.replace(/^\./, '')
        }
        let str = t.text.replace(/\./, '')
        t.set(str)
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
  Abbreviations.prototype.unwrap = Abbreviations.prototype.stripPeriods

  Doc.prototype.abbreviations = function (n) {
    let match = this.match('#Abbreviation')
    if (typeof n === 'number') {
      match = match.get(n)
    }
    return new Abbreviations(match.list, this, this.world)
  }
  return Doc
}
module.exports = addMethod
