const hasPeriod = /\./

const addMethod = function (Doc) {
  /**  */
  class Acronyms extends Doc {
    stripPeriods() {
      this.termList().forEach(t => {
        let str = t.text.replace(/\./g, '')
        t.set(str)
      })
      return this
    }
    addPeriods() {
      this.termList().forEach(t => {
        let str = t.text.replace(/\./g, '')
        str = str.split('').join('.')
        // don't add a end-period if there's a sentence-end one
        if (hasPeriod.test(t.post) === false) {
          str += '.'
        }
        t.set(str)
      })
      return this
    }
  }
  Acronyms.prototype.unwrap = Acronyms.prototype.stripPeriods
  Acronyms.prototype.strip = Acronyms.prototype.stripPeriods

  Doc.prototype.acronyms = function (n) {
    let match = this.match('#Acronym')
    if (typeof n === 'number') {
      match = match.get(n)
    }
    return new Acronyms(match.list, this, this.world)
  }
  return Doc
}
module.exports = addMethod
