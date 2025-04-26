import nlp from '../../../../src/three.js'
const world = nlp.world()
const splitSentences = nlp.methods().one.tokenize.splitSentences

const fastSplit = function (str, numChunks = 1) {
  const size = Math.ceil(str.length / numChunks)
  const chunks = new Array(numChunks)
  for (let i = 0, o = 0; i < numChunks; ++i, o += size) {
    chunks[i] = str.substr(o, size)
  }
  return chunks
}

const pluckStarts = function (arr) {
  for (let i = 1; i < arr.length; i += 1) {
    const top = arr[i].substr(0, 200)
    const first = splitSentences(top, world)[0]
    // move the first (part) sentence onto the end of the last one
    const len = first.length
    arr[i - 1] += first
    arr[i] = arr[i].substring(len)
  }
  return arr
}

// split a text quickly, then repair splits by sentence
const rip = function (txt, parts = 1) {
  let arr = fastSplit(txt, parts)
  arr = pluckStarts(arr)
  return arr
}
export default rip

// let res = rip('one, two, three. four five six. seven eight nine', 4)
// console.log(JSON.stringify(res, null, 2))