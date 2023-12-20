export default {
  // lib: {
  //   freeze: function (obj) {
  //     this.world().model.two.freeze = obj
  //   },
  // },

  mutate: world => {
    // add @isFrozen method
    world.methods.one.termMethods.isFrozen = term => term.frozen === true
  },

  api: function (View) {
    // set all terms to reject any desctructive tags
    View.prototype.freeze = function () {
      this.docs.forEach(ts => {
        ts.forEach(term => {
          term.frozen = true
        })
      })
      return this
    }
    // reset all terms to allow  any desctructive tags
    View.prototype.unfreeze = function () {
      this.docs.forEach(ts => {
        ts.forEach(term => {
          delete term.frozen
        })
      })
      return this
    }
    // return all frozen terms
    View.prototype.isFrozen = function () {
      return this.match('@isFrozen+')
    }
  },
}
