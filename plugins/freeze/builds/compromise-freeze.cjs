(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.compromiseFreeze = factory());
})(this, (function () { 'use strict';

  var plugin = {
    // lib: {
    //   freeze: function (obj) {
    //     this.world().model.two.freeze = obj
    //   },
    // },

    mutate: world => {
      // add @isFrozen method
      world.methods.one.termMethods.isFrozen = term => term.frozen === true;
    },

    api: function (View) {
      // set all terms to reject any desctructive tags
      View.prototype.freeze = function () {
        this.docs.forEach(ts => {
          ts.forEach(term => {
            term.frozen = true;
          });
        });
        return this
      };
      // reset all terms to allow  any desctructive tags
      View.prototype.unfreeze = function () {
        this.docs.forEach(ts => {
          ts.forEach(term => {
            delete term.frozen;
          });
        });
        return this
      };
      // return all frozen terms
      View.prototype.isFrozen = function () {
        return this.match('@isFrozen+')
      };
    },
  };

  return plugin;

}));
