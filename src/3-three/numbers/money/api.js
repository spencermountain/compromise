import symbols from './currencies.js'

const find = function (doc) {
  return doc.match('#Money+ #Currency? (#Money+ #Currency?)?')
}


const parse = function (m) {
  m = m.clone()
  let currency = m.match('#Currency').nouns().toSingular().text('normal')
  const num = m.match('#Money').numbers().get()[0]
  if (!currency) {
    // look for currency in symbol
    let str = m.text()
    const found = symbols.find(([sym]) => str.includes(sym))
    if (found) {
      currency = found[1]
    }
  }
  return {
    currency,
    num,
  }
}

const plugin = function (View) {
  /**
   */
  class Money extends View {
    constructor(document, pointer, groups) {
      super(document, pointer, groups)
      this.viewType = 'Money'
    }
    parse(n) {
      return this.getNth(n).map(parse)
    }
    get(n) {
      return this.getNth(n).map(parse).map(p => p.num)
    }
    json(n) {
      return this.getNth(n).map(p => {
        const json = p.toView().json(n)[0]
        const parsed = parse(p)
        json.money = parsed
        return json
      }, [])
    }
    currency(n) {
      return this.getNth(n).map(p => {
        const parsed = parse(p)
        return parsed.currency
      })
    }
  }

  View.prototype.money = function (n) {
    let m = find(this)
    m = m.getNth(n)
    return new Money(this.document, m.pointer)
  }
}

export default plugin
