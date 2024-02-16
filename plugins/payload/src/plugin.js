import debug from './debug.js'

export default {
  //establish payload db
  mutate: function (world) {
    world.model.one.db = {}
    world.methods.one.debug.payload = debug
  },

  api: function (View) {
    /** return any data on our given matches */
    View.prototype.getPayloads = function () {
      let res = []
      let db = this.world.model.one.db || {}
      this.fullPointer.forEach(ptr => {
        let n = ptr[0]
        if (db.hasOwnProperty(n)) {
          // look at all vals for this sentence
          db[n].forEach(obj => {
            console.log(obj.ptr)
            let m = this.update([obj.ptr])
            if (this.has(m)) {
              res = res.concat({
                match: m,
                val: obj.val,
              })
            }
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
        if (typeof val === 'function') {
          //push in whatever the callback wants
          let m = this.update([ptr])
          let res = val(m)
          if (res !== null && res !== undefined) {
            db[n].push({ ptr, val: res })
          }
        } else {
          db[n].push({ ptr, val }) //push some static data
        }
      })
      return this
    }

    /** remove all payloads in selection */
    View.prototype.clearPayloads = function () {
      let db = this.world.model.one.db || {}
      // get each payload
      let res = this.getPayloads()
      res.forEach(obj => {
        let ptr = obj.match.fullPointer[0] || []
        let [n, start, end] = ptr
        // db[n] = db[n] || []
        // remove it from our list of payloads
        db[n] = db[n].filter(r => {
          if (r.ptr[1] === start && r.ptr[2] === end) {
            return false
          }
          return true
        })
        // clean-up any empty arrays
        if (db[n].length === 0) {
          delete db[n]
        }
      })
      return this
    }
  },
}
