import nlp from '../../../src/three.js'
import plg from './src/plugin.js'
nlp.plugin(plg)

let arr = [
  "the acting was terrible",
  "these pretzels are making me thirsty",
]

let res = nlp(arr[0]).sentiment()
console.log(res)