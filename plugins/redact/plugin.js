const plugin = {
  api: function (View) {
    View.prototype.redact = function () {
      console.log('oooooh yeah')
    }
  },
}
export default plugin
