// name the View subclass, and have .update() return it, sharing the match cache
const keepClass = (Cls, name) => {
  Cls.prototype.viewType = name
  Cls.prototype.update = function (pointer) {
    const m = new this.constructor(this.document, pointer)
    m._cache = this._cache
    m.world = this.world
    return m
  }
}

// replace() option: keep the tags of the replaced words
const keepTags = { tags: true }

// the json of each match, plus a parsed form under one key
const jsonWith = (view, n, key, fn) => {
  const opts = typeof n === 'object' ? n : {}
  return view.getNth(n).map(p => {
    const json = p.toView().json(opts)[0]
    json[key] = fn(p)
    return json
  }, [])
}

// the normalized text of each match
const toArray = m => m.json({ normal: true, terms: false, text: false }).map(s => s.normal)

export { keepTags, toArray, jsonWith }
export default keepClass
