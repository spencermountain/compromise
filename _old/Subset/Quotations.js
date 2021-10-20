const pairs = {
  '\u0022': '\u0022', // 'StraightDoubleQuotes'
  '\uFF02': '\uFF02', // 'StraightDoubleQuotesWide'
  '\u0027': '\u0027', // 'StraightSingleQuotes'
  '\u201C': '\u201D', // 'CommaDoubleQuotes'
  '\u2018': '\u2019', // 'CommaSingleQuotes'
  '\u201F': '\u201D', // 'CurlyDoubleQuotesReversed'
  '\u201B': '\u2019', // 'CurlySingleQuotesReversed'
  '\u201E': '\u201D', // 'LowCurlyDoubleQuotes'
  '\u2E42': '\u201D', // 'LowCurlyDoubleQuotesReversed'
  '\u201A': '\u2019', // 'LowCurlySingleQuotes'
  '\u00AB': '\u00BB', // 'AngleDoubleQuotes'
  '\u2039': '\u203A', // 'AngleSingleQuotes'
  // Prime 'non quotation'
  '\u2035': '\u2032', // 'PrimeSingleQuotes'
  '\u2036': '\u2033', // 'PrimeDoubleQuotes'
  '\u2037': '\u2034', // 'PrimeTripleQuotes'
  // Prime 'quotation' variation
  '\u301D': '\u301E', // 'PrimeDoubleQuotes'
  '\u0060': '\u00B4', // 'PrimeSingleQuotes'
  '\u301F': '\u301E', // 'LowPrimeDoubleQuotesReversed'
}

const hasOpen = RegExp('(' + Object.keys(pairs).join('|') + ')')

const addMethod = function (Doc) {
  /** "these things" */
  class Quotations extends Doc {
    /** remove the quote characters */
    unwrap() {
      return this
    }
  }

  Doc.prototype.quotations = function (n) {
    let list = []
    this.list.forEach(p => {
      let terms = p.terms()
      //look for opening quotes
      for (let i = 0; i < terms.length; i += 1) {
        const t = terms[i]
        if (hasOpen.test(t.pre)) {
          let char = (t.pre.match(hasOpen) || [])[0]
          let want = pairs[char]
          // if (!want) {
          //   console.warn('missing quote char ' + char)
          // }
          //look for the closing bracket..
          for (let o = i; o < terms.length; o += 1) {
            if (terms[o].post.indexOf(want) !== -1) {
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
      return new Quotations(list, this, this.world)
    }
    return new Quotations(list, this, this.world)
  }
  // alias
  Doc.prototype.quotes = Doc.prototype.quotations

  return Doc
}
module.exports = addMethod
