const open = /\(/
const close = /\)/

const addMethod = function (Doc) {
  /** anything between (these things) */
  class Parentheses extends Doc {
    /** remove the parentheses characters */
    unwrap() {
      this.list.forEach(p => {
        let first = p.terms(0)
        first.pre = first.pre.replace(open, '')
        let last = p.lastTerm()
        last.post = last.post.replace(close, '')
      })
      return this
    }
  }

  Doc.prototype.parentheses = function (n) {
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
    //support nth result
    if (typeof n === 'number') {
      if (list[n]) {
        list = [list[n]]
      } else {
        list = []
      }
      return new Parentheses(list, this, this.world)
    }
    return new Parentheses(list, this, this.world)
  }

  return Doc
}
module.exports = addMethod
