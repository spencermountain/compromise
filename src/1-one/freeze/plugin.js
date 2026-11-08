import compute from './compute.js'
import eachTerm from '../tokenize/compute/_lib.js'

export default {
  // add .compute('freeze')
  compute,

  mutate: world => {
    const methods = world.methods.one
    // add @isFrozen method
    methods.termMethods.isFrozen = term => term.frozen === true
    // `.debug('frozen')` is the tags view, which marks frozen terms
    methods.debug.freeze = view => methods.debug.tags(view)
    methods.debug.frozen = methods.debug.freeze
  },

  api: function (View) {
    // set all terms to reject any desctructive tags
    View.prototype.freeze = function () {
      eachTerm(this.docs, term => {
        term.frozen = true
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
