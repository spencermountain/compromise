import parse from './parse.js'

const addDurations = function (View) {
  /** phrases like '2 months', or '2mins' */
  class Durations extends View {
    constructor(document, pointer, groups) {
      super(document, pointer, groups)
      this.context = {}
    }
    /** overload the original json with duration information */
    json(opts = {}) {
      return this.map(m => {
        let json = m.toView().json(opts)[0] || {}
        if (opts && opts.duration !== false) {
          json.duration = parse(m)
        }
        return json
      }, [])
    }
    /** easy getter for the time */
    get(options) {
      let arr = []
      this.forEach(doc => {
        let res = parse(doc)
        arr.push(res)
      })
      if (typeof options === 'number') {
        return arr[options]
      }
      return arr
    }
  }

  /** phrases like '2 months' */
  View.prototype.durations = function (n) {
    let m = this.match('#Value+ #Duration (and? #Value+ #Duration)?')

    // not 'in 20 minutes'
    m = m.notIf('#DateShift')

    if (typeof n === 'number') {
      m = m.eq(n)
    }
    return new Durations(this.document, m.pointer)
  }
}
export default addDurations
