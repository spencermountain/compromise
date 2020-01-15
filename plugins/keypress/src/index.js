const addMethods = function(nlp) {
  let memo = {}
  nlp.keypress = function(str) {
    let doc = nlp.tokenize(str)
    let sentences = doc.json()
    sentences.forEach(o => {
      //keep it
      if (memo.hasOwnProperty(o.text) === false) {
        console.log(o.text)
        memo[o.text] = o
      } else {
        // nlp.import([[o]])
      }
    })
    // console.log(sentences)
  }
  nlp.clear = function() {
    memo = {}
  }
  console.log(nlp.version)
}

module.exports = addMethods
