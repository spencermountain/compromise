import compute from './compute.js'

export default {
  // add .compute('freeze')
  compute,

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
      this.compute('unfreeze')
    }
    // return all frozen terms
    View.prototype.isFrozen = function () {
      return this.match('@isFrozen+')
    }
  },
  // run it in init
  hooks: ['freeze'],
}
