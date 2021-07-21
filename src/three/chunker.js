const chunker = function (world, View) {
  class ChunkView extends View {
    constructor(document, pointer, groups) {
      super(document, pointer, groups)
      this.viewType = 'Chunks'
    }
  }

  View.prototype.chunks = function () {
    return new ChunkView(this.document, this.pointer)
  }
}
export default chunker
