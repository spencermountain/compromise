// have .update() return the same View subclass, sharing the match cache
const keepClass = Cls => {
  Cls.prototype.update = function (pointer) {
    const m = new this.constructor(this.document, pointer)
    m._cache = this._cache
    m.world = this.world
    return m
  }
}

// replace() option: keep the tags of the replaced words
const keepTags = { tags: true }

// the normalized text of each match
const toArray = m => m.json({ normal: true, terms: false, text: false }).map(s => s.normal)

export { keepTags, toArray }
export default keepClass
