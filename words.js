import nlp from './src/three.js'


let obj = {


  // these are all Adjectives
  misc: [


    "round",
    "wound",


    "tender",


    "worst",

    "hinny",


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

