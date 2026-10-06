import debug from './debug.js'

// payloads are stored by sentence index, which goes stale after a .remove()
// so find each one again by the ids of its first and last terms
const findPayloads = function (view) {
  const db = view.world.model.one.db || {}
  const where = new Map()
  view.document.forEach((terms, n) => {
    terms.forEach((term, i) => where.set(term.id, [n, i]))
  })
  const found = []
  Object.keys(db).forEach(k => {
    db[k].forEach(obj => {
      const [, , , startId, endId] = obj.ptr
      const start = where.get(startId)
      const end = where.get(endId)
      // its words were removed
      if (!start || !end || start[0] !== end[0]) {
        return
      }
      found.push({ k, obj, ptr: [start[0], start[1], end[1] + 1, startId, endId] })
    })
  })
  return found
}

// all payloads inside our current matches
const getPayloads = function (view) {
  const payloads = findPayloads(view)
  const res = []
  view.fullPointer.forEach(ptr => {
    const seeking = view.update([ptr])
    payloads.forEach(found => {
      if (found.ptr[0] !== ptr[0]) {
        return
      }
      const m = view.update([found.ptr])
      if (seeking.has(m)) {
        res.push({ ...found, match: m })
      }
    })
  })
  return res
}

export default {
  //establish payload db
  mutate: function (world) {
    world.model.one.db = {}
    world.methods.one.debug ||= {}
    world.methods.one.debug.payload = debug
  },

  api: function (View) {
    /** return any data on our given matches */
    View.prototype.getPayloads = function () {
      return getPayloads(this).map(found => {
        return {
          match: found.match,
          val: found.obj.val,
        }
      })
    }

    /** add data about our current matches */
    View.prototype.addPayload = function (val) {
      const db = this.world.model.one.db || {}
      this.fullPointer.forEach(ptr => {
        const n = ptr[0]
        db[n] ||= []
        if (typeof val === 'function') {
          //push in whatever the callback wants
          const m = this.update([ptr])
          const res = val(m)
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
      const db = this.world.model.one.db || {}
      // get each payload
      getPayloads(this).forEach(({ k, obj }) => {
        if (!Object.hasOwn(db, k)) {
          return
        }
        // remove it from our list of payloads
        db[k] = db[k].filter(r => r !== obj)
        // clean-up any empty arrays
        if (db[k].length === 0) {
          delete db[k]
        }
      })
      return this
    }
  },
}
