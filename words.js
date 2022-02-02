import nlp from './src/three.js'

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

let obj = {


  misc: [


  ]

}
let pos = '#Adjective'
let key = 'misc'
let right = 0
let wrong = 0
obj[key].forEach(w => {
  let doc = nlp(w)
  if (!doc.has(pos)) {
    let tags = doc.json({ tagRank: true })[0].terms[0].tags
    // console.log(`"${w}",  //`, tags[0])
    console.log(`✗ `, w)
    wrong += 1
  } else {
    // console.log(`✔ `, w)
    right += 1
  }
})
console.log(right, 'right')
console.log(wrong, 'wrong')

