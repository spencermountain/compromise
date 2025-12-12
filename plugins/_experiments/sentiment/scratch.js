import nlp from '../../../src/three.js'
import plg from './src/plugin.js'
nlp.plugin(plg)

const arr = [
  "the acting was terrible",
  "these pretzels are making me thirsty",
]

const res = nlp(arr[0]).sentiment()
console.log(res)
