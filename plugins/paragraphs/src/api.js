
const concatArr = function (views, fn) {
  let arr = []
  views.forEach(m => {
    arr.push(m[fn]())
  })
  return arr
}

const concatStr = function (views, cb) {
  let str = []
  views.forEach(m => {
    str += cb(m)
  })
  return str
}

const concatDoc = function (views, cb) {
  let ptrs = []
  views.forEach(m => {
    let res = cb(m)
    if (res.found) {
      ptrs = ptrs.concat(res.ptrs)
    }
  })
  return views[0].update(ptrs)
}


const api = function (View) {



  class Paragraphs {
    constructor(views) {
      this.viewType = 'Paragraphs'
      this.views = views
    }
    // is the view not-empty?
    get found() {
      return this.views.length > 0
    }
    // how many matches we have
    get length() {
      return this.views.length
    }

    text(fmt) {
      return concatStr(this.views, (m) => m.text(fmt))
    }
    json() {
      return concatArr(this.views, 'json')
    }
    match(reg) {
      return concatDoc(this.views, (view) => view.match(reg))
    }
    not(reg) {
      return concatDoc(this.views, (view) => view.match(reg))
    }
    sentences() {
      return concatDoc(this.views, (view) => view)
    }
    terms() {
      return concatDoc(this.views, (view) => view.terms())
    }
    filter(fn) {
      let res = this.views.filter(p => {
        return p.some(fn)
      })
      return this.update(res)
    }
    forEach(fn) {
      this.views.forEach(p => {
        p.forEach(fn)
      })
      return this
    }
    map(fn) {
      let res = this.views.map(view => {
        return fn(view)
      })
      return this.update(res)
    }
    // boolean
    has(reg) {
      return this.views.some(view => view.has(reg))
    }
    if(reg) {
      let views = this.views.filter(view => view.has(reg))
      return this.update(views)
    }
    ifNo(reg) {
      let views = this.views.filter(view => !view.has(reg))
      return this.update(views)
    }
    eq(num) {
      let p = this.views[num]
      if (p) {
        return this.update([p])
      }
      return this.update([])
    }
    first() {
      return this.eq(0)
    }
    last() {
      return this.eq(this.length - 1)
    }
    debug() {
      this.views.forEach((view) => {
        console.log('\n=-=-=-=-')//eslint-disable-line
        view.debug()
      })
    }

    // overloaded - keep Paragraphs class
    update(views) {
      let m = new Paragraphs(views)
      return m
    }
  }

  /** */
  View.prototype.paragraphs = function () {
    const hasTwoNewline = /\n\n/
    let all = []
    let run = []
    this.all().forEach(s => {
      let end = s.lastTerm()
      run.push(s.ptrs[0])
      if (hasTwoNewline.test(end.post())) {
        all.push(run)
        run = []
      }
    })
    if (run.length) {
      all.push(run)
    }
    let views = all.map(ptr => {
      return this.update(ptr)
    })
    return new Paragraphs(views)
  }
}
export default api