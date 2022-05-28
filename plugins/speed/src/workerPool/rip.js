import nlp from '../../../../src/three.js'
let model = nlp.model()
const splitSentences = nlp.methods().one.tokenize.splitSentences

const inParts = function (arr, parts) {
  let chunkSize = Math.ceil(arr.length / parts)
  // console.log(chunkSize)
  let res = []
  for (let i = 0; i < parts; i += 1) {
    let start = chunkSize * i
    res.push(arr.slice(start, start + chunkSize))
  }
  return res
}

const rip = function (txt, parts = 1) {
  let arr = splitSentences(txt, model)
  let groups = inParts(arr, parts)
  return groups
}
export default rip


// console.log(rip('one. two. three. four. five. six. seven. eight. nine', 4))