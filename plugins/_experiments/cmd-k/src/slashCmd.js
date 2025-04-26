
// slashCmds are / followed by a word
// they're a way to add custom commands
// "/me writes some bugs"

const slashCmd = {
  /** add a method */
  api: (View) => {
    View.prototype.slashCmds = function () {
      return this.matchOne('#SlashCmd+').text('normal')
    }
  },


  /** add some tags */
  tags: {
    SlashCmd: {
      notA: ['Noun', 'Verb', 'Adjective'],
      color: 'yellow'
    },
  },


  /** post-process tagger */
  compute: {
    tagSlashCmds: (doc) => {
      doc.match([{ pre: '/' }]).not('#Number').tag('#SlashCmd')
    }
  },


  /** run it on init */
  hooks: ['tagSlashCmds']
}
export default slashCmd