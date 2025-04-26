
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

  /** add some tags */
  tags: {
    SearchBang: {
      color: 'red'
    },
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
export default searchBang