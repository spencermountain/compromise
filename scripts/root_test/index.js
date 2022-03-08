/* eslint-disable no-console, no-unused-vars */
import words from '/Users/spencer/mountain/minimum-model/root-dictionary/verb-noun.js'
import nlp from '../../src/three.js'


const suffixSort = function (arr) {
  const reverse = (str = '') => str.split('').reverse().join('')
  return arr.sort((a, b) => {
    a = reverse(a)
    b = reverse(b)
    if (a > b) {
      return 1
    } else if (a < b) {
      return -1
    }
    return 0
  })
}

let arr = []
const pos = '#Adjective'
words.forEach(w => {
  let doc = nlp(w)
  if (doc.has(pos)) {
    let tags = doc.json({ tagRank: true })[0].terms[0].tags
    // console.log(`"${w}",  //`, tags[0])
    arr.push(w)
  }
})

console.log(JSON.stringify(suffixSort(arr), null, 2))