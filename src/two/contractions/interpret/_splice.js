// put n new words where 1 word was
const insertContraction = function (document, point, words = []) {
  let [n, w] = point
  words = words.map(word => {
    return {
      text: '',
      pre: '',
      post: '',
      normal: '',
      implicit: word,
      tags: new Set(),
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
