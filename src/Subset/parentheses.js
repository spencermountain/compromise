const open = /\(/
const close = /\)/

const addMethod = function(Doc) {
  /**  */
  class Parentheses extends Doc {
    unwrap() {
      return this
    }
    // addPeriods() {
    //   return this
    // }
  }

  Doc.prototype.parentheses = function(n) {
    let list = []
    this.list.forEach(p => {
      let terms = p.terms()
      //look for opening brackets
      for (let i = 0; i < terms.length; i += 1) {
        const t = terms[i]
        if (open.test(t.pre)) {
          //look for the closing bracket..
          for (let o = i; o < terms.length; o += 1) {
            if (close.test(terms[o].post)) {
              let len = o - i + 1
              list.push(p.buildFrom(t.id, len))
              i = o
              break
            }
          }
        }
      }
    })
    return new Parentheses(list, this, this.world)
  }
  return Doc
}
module.exports = addMethod
