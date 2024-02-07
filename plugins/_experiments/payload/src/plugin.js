export default {
  //establish payload db
  mutate: function (world) {
    world.model.one.db = {}
  },

  api: function (View) {
    /** add data about our current matches */
    View.prototype.addPayload = function (data) {
      let db = this.world.model.one.db || {}
      this.fullPointer.forEach(ptr => {
        let n = ptr[0]
        db[n] = db[n] || []
        db[n].push(ptr, data)
      })
      return this
    }
    /** return any data on our given matches */
    View.prototype.getPayloads = function () {
      let res = []
      let db = this.world.model.one.db || {}
      this.fullPointer.forEach(ptr => {
        let n = ptr[0]
        if (db.hasOwnProperty(n)) {
          let match = this.update(db[n][0])
          res = res.concat({
            match,
            payload: db[n][1],
          })
        }
      })
      return res
    }
  },
}
