/*
unique & ordered-ids, based on time & term index

TTT - > 46 seconds since load
NNN - > 46 thousand sentences (1 inf-jest)
II   - > 1,200 words in a sentence
TTTNNNII

to overflow, you must wait a minute, then load an infinite jest
*/
const start = new Date().getTime()

const pad = (str) => {
  str = str.length < 3 ? '0' + str : str
  return str.length < 3 ? '0' + str : str
}

const toId = function (n, i) {
  var now = new Date().getTime() - start;
  now = parseInt(now, 10)

  //don't overflow time
  now = now > 46655 ? 46655 : now
  //don't overflow sentences
  n = n > 46655 ? 46655 : n
  // //don't overflow terms
  i = i > 1294 ? 1294 : i

  // 3 digits for time
  let id = pad(now.toString(36))
  // 3 digit  for sentence index (46k)
  id += pad(n.toString(36))

  // 1 digit for term index (36)
  let tx = i.toString(36)
  tx = tx.length < 2 ? '0' + tx : tx
  id += tx

  // 1 digit random number
  let r = parseInt(Math.random() * 36, 10)
  id += (r).toString(36)

  if (id.length !== 9) {
    console.log('!9 ' + id)
  }
  return id.toUpperCase()
}

// console.log(toId(4, 8))

export default toId


// setInterval(() => {
//   console.log(toId(4, 12))
// }, 100)

// test - match
// let begin = new Date()
// let all = {}
// let dupes = 0
// for (let n = 0; n < 50000; n += 1) {
//   for (let i = 0; i < 20; i += 1) {
//     let id = toId(n, i)
//     if (all[id] === true) {
//       // console.log(id)
//       dupes += 1
//     }
//     all[id] = true
//   }
// }
// let end = new Date()
// console.log((end.getTime() - begin.getTime()) / 1000)
// console.log(dupes, 'dupes')