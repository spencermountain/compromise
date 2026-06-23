const find = function (doc) {
  let nums = doc.numbers()
  nums = nums.filter(v => v.has('#Money') || v.after('^#Currency'))
  return nums
}

const parse = function (m) {
  m = m.clone()
  const currency = m.match('#Currency').text('normal')
  const num = m.match('#Money').numbers().get()[0]
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
      return this.getNth(n).map(parse)
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
