// import nlp from 'compromise'
import nlp from '../../../src/two.js'
import { unpack } from 'efrt'
import model from '../_model.js'



console.log('unpacking list..')
let list = Object.keys(unpack(model))
console.log(list.length.toLocaleString(), 'articles')
// console.log(list.filter(str => str.match(/toronto/)))

console.log('compiling lookup..')
let trie = nlp.compile(list)

const plugin = {
  api: function (View) {
    View.prototype.wikipedia = function () {
      return this.lookup(trie)
    }
  }
}

export default plugin
