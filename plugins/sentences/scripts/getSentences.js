const data = require('../data/smaller-tags.json')

const shuffle = function (array) {
  let currentIndex = array.length
  let temporaryValue = null
  let randomIndex = null
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex -= 1
    temporaryValue = array[currentIndex]
    array[currentIndex] = array[randomIndex]
    array[randomIndex] = temporaryValue
  }
  return array
}

let arr = data.map((a) => a[0].trim())
arr = shuffle(arr).slice(0, 200)
console.log(JSON.stringify(arr, null, 2))
