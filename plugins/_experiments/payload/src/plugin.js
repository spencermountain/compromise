export default {
  //establish payload db
  mutate: function (world) {
    world.model.one.db = {}
  },

  api: function (View) {
    /** return any data on our given matches */
    View.prototype.getPayloads = function () {
      let res = []
      let db = this.world.model.one.db || {}
      this.fullPointer.forEach(ptr => {
        let n = ptr[0]
        if (db.hasOwnProperty(n)) {
          db[n].forEach(obj => {
            res = res.concat({
              match: this.update(obj.ptr),
              val: obj.val,
            })
          })
        }
      })
      return res
    }

    /** add data about our current matches */
    View.prototype.addPayload = function (val) {
      let db = this.world.model.one.db || {}
      this.fullPointer.forEach(ptr => {
        let n = ptr[0]
        db[n] = db[n] || []
        db[n].push({ ptr, val })
      })
      return this
    }
  },
}
