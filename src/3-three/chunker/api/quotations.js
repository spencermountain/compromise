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

const find = function (view) {
  view.compute('index')
  view.docs.forEach(terms => {
    let isOpen = false
    terms.forEach(term => {
      if (!isOpen && term.pre && hasOpen.test(term.pre)) {
      }
    })
  })
}

const quotations = function (n) {
  return find(this)
}
export default quotations
