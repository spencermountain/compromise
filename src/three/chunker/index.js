import Chunks from './Chunks.js'

const chunker = function (View) {
  View.prototype.chunks = function () {
    return new Chunks(this.document, this.pointer)
  }
}
export default chunker
