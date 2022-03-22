/* eslint-disable no-console */
import nlp from '../../../src/one.js'
import { unpack } from 'efrt'
import model from './_model.js'

// const hasNum = /[0-9]/

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
