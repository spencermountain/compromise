// have .update() return the same View subclass, sharing the match cache
const keepClass = Cls => {
  Cls.prototype.update = function (pointer) {
    const m = new this.constructor(this.document, pointer)
    m._cache = this._cache
    m.world = this.world
    return m
  }
}

export default keepClass
