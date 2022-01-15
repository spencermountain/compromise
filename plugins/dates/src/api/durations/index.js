import parse from './parse.js'

const methods = {
  /** easy getter for the time */
  get: function (options) {
    let arr = []
    this.forEach((doc) => {
      let res = parse(doc)
      arr.push(res)
    })
    if (typeof options === 'number') {
      return arr[options]
    }
    return arr
  },
  /** overload the original json with duration information */
  json(opts = {}) {
    return this.map(m => {
      let json = m.toView().json(opts)[0] || {}
      if (opts && opts.times !== true) {
        json.duration = parse(m)
      }
      return json
    }, [])
  }
  /** change to a standard duration format */
  // normalize: function () {
  //   this.forEach((doc) => {
  //     let duration = parse(doc)
  //     let list = []
  //     Object.keys(duration).forEach((unit) => {
  //       let num = duration[unit]
  //       let word = unit
  //       if (num !== 1) {
  //         word += 's'
  //       }
  //       list.push(`${num} ${word}`)
  //     })
  //     // splice-in an 'and'
  //     if (list.length > 1) {
  //       let beforeEnd = list.length - 1
  //       list.splice(beforeEnd, 0, 'and')
  //     }
  //     let text = list.join(' ')
  //     doc.replaceWith(text)
  //   })
  //   return this
  // },
}

const addDurations = function (View) {
  /** phrases like '2 months', or '2mins' */
  class Durations extends View {
    constructor(document, pointer, groups) {
      super(document, pointer, groups)
      this.context = {}
    }
  }
  //add-in methods
  Object.assign(Durations.prototype, methods)

  /** phrases like '2 months' */
  View.prototype.durations = function (n) {
    let m = this.match('#Value+ #Duration (and? #Value+ #Duration)?')
    // add '20mins'
    m = m.concat(this.match('(#Duration && /[0-9][a-z]+$/)'))

    // not 'in 20 minutes'
    m = m.notIf('#DateShift')

    if (typeof n === 'number') {
      m = m.eq(n)
    }
    return new Durations(this.document, m.pointer)
  }
}
export default addDurations
