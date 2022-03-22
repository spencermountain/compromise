const initSplit = /(\S.+?[.!?\u203D\u2E18\u203C\u2047-\u2049])(?=\s|$)/g
const newLine = /((?:\r?\n|\r)+)/ // Match different new-line formats
// Start with a regex:
const basicSplit = function (text) {
  let all = []
  //first, split by newline
  let lines = text.split(newLine)
  for (let i = 0; i < lines.length; i++) {
    //split by period, question-mark, and exclamation-mark
    let arr = lines[i].split(initSplit)
    for (let o = 0; o < arr.length; o++) {
      all.push(arr[o])
    }
  }
  return all
}
export default basicSplit
