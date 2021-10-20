const plugin = {
  compute: {
    syllables: function () {
      console.log('computing syllables')
    },
  },
  api: function (View) {
    View.prototype.syllables = function () {
      this.compute('syllables')
      return this.json()
    }
  },
}
export default plugin
