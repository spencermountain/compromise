// put n new words where 1 word was
const insertContraction = function (document, point, words = [], hint = []) {
  let [n, w] = point
  words = words.map((word, i) => {
    let tags = new Set()
    if (hint[i]) {
      tags.add(hint[i]) // apply tag hints from contraction
    }
    return {
      text: '',
      pre: '',
      post: '',
      normal: '',
      implicit: word,
      machine: word,
      tags: tags,
    }
  })
  if (words[0]) {
    // move whitespace over
    words[0].pre = document[n][w].pre
    words[words.length - 1].post = document[n][w].post
    // add the text/normal to the first term
    words[0].text = document[n][w].text
    words[0].normal = document[n][w].normal // move tags too?
  }
  // do the splice
  document[n].splice(w, 1, ...words)
}
export default insertContraction
