import words from '/Users/spencer/mountain/minimum-model/root-dictionary/adj.js'
import nlp from '../../src/three.js'

const pos = '#Adjective'
words.forEach(w => {
  let doc = nlp(w)
  if (!doc.has(pos)) {
    let tags = doc.json({ tagRank: true })[0].terms[0].tags
    console.log(`"${w}",  //`, tags[0])
  }
})