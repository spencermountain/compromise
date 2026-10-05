import { unpack } from 'efrt'
import model from './_model.js'

const plugin = {
  api: function (View) {
    View.prototype.wikipedia = function () {
      return this.lookup(this.world.model.wpTree)
    }
  },
  mutate: (world, nlp) => {
    // console.log('unpacking list..')
    const list = Object.keys(unpack(model))
    // console.log(list.length.toLocaleString(), 'articles')
    world.model.wpTree = nlp.buildTrie(list)
  }
}

export default plugin
