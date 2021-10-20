const plugin = {
  api: function (View) {
    View.prototype.dates = function () {
      console.log('oooooh yeah')
    }
  },
}
export default plugin
