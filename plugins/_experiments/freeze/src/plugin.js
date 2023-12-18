export default {
  lib: {
    freeze: function (obj) {
      this.world().model.two.freeze = obj
    },
  },

  api: function (View) {
    View.prototype.freeze = function () {
      console.log(this.model.two.freeze)
      return this
    }
  },
}
