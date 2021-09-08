const plugin = {
  api: function (View) {
    View.prototype.paragraphs = function () {
      console.log('oooooh yeah')
    }
  },
}
export default plugin
