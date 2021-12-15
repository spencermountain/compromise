/*
unique & ordered-ids, based on term index

novels: 
  av 80,000 words
  15 words per sentence
  5,000 sentences

Base 36 (numbers+ascii)
  3 digit for sentences (46k)
  1 digit for words (36)
  1 digit for random

  ZZZ|Z|Z

at 5 digits, we support a novel of 46,000 very-long sentences
or ~ 1 million words
or 2 infinite jests

https://en.wikipedia.org/wiki/List_of_longest_novels

Infinite Jest:
  36,247 sentences


*/
const toId = function (n, i) {
  //don't overflow sentences
  n = n > 46655 ? 46655 : n
  //don't overflow terms
  i = i > 35 ? 35 : i

  // 3 digit  for sentence index (46k)
  let id = n.toString(36)
  // 0-pad to 3 digits
  id = id.length < 3 ? '0' + id : id
  id = id.length < 3 ? '0' + id : id

  // 1 digit for term index (36)
  id += i.toString(36)

  // 1 digit random number
  let r = parseInt(Math.random() * 36, 10)
  id += (r).toString(36)
  if (id.length > 5) {
    console.log('+5' + id)
  }
  return id
}

const compute = function (view) {
  let docs = view.docs
  for (let n = 0; n < docs.length; n += 1) {
    for (let i = 0; i < docs[n].length; i += 1) {
      if (docs[n][i].id === undefined) {
        docs[n][i].id = toId(n, i)
      }
    }
  }
}
export default compute


console.log(toId(20400, 12))

// test-match
// let begin = new Date()
// let all = {}
// let dupes = 0
// for (let n = 0; n < 50000; n += 1) {
//   for (let i = 0; i < 20; i += 1) {
//     let id = toId(n, i)
//     if (all[id] === true) {
//       dupes += 1
//     }
//     all[id] = true
//   }
// }
// let end = new Date()
// console.log((end.getTime() - begin.getTime()) / 1000)
// console.log(dupes)