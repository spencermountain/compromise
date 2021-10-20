const plugin = {
  api: function (View) {
    View.prototype.scan = function () {
      console.log('oooooh yeah')
    }
    View.prototype.typeahead = function () {
      console.log('oooooh yeah')
    }
  },
}
export default plugin
