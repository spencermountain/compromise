
import nlp from './src/three.js'
// import plg from './plugins/dates/src/plugin.js'
// nlp.plugin(plg)

const instaBangs = [
  'g',
  'gh',
  'yt',
]

const searchBang = {
  /** add a method */
  api: (View) => {
    View.prototype.searchBangs = function () {
      return this.matchOne('#SearchBang+').text('normal')
    }
  },


  /** add words to the stronger, more adamant lexicon */
  frozen: instaBangs.reduce((h, str) => {
    h[str] = 'SearchBang'
    h['!' + str] = 'SearchBang'
    return h
  }, {}),

  /** post-process tagger */
  compute: {
    tagBangs: (doc) => {
      doc.match([{ word: '!' }]).tag('#SearchBang')
      doc.match([{ pre: '!' }]).tag('#SearchBang')
      doc.match([{ post: '!' }]).tag('#SearchBang')
    }
  },


  /** run it on init */
  hooks: ['tagBangs']
}
nlp.plugin(searchBang)
// nlp('Will is an employee').debug()



let txt = '! i walk !ohyeah'
// txt = `i sent the documents up the hill`
// txt = `he would up stage his friend`
// txt = `he couldn't off gas`
// txt = `he got up over the hill`
// txt = 'piled up over'
// text = ``
let doc = nlp(txt).debug()
// console.log(doc.docs)