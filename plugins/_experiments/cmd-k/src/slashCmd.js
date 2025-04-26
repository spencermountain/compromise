
const slashCmd = {
  /** add a method */
  api: (View) => {
    View.prototype.slashCmds = function () {
      return this.matchOne('#SlashCmd+').text('normal')
    }
  },


  /** add some tags */
  tags: {
    SlashCmd: {},
  },


  /** post-process tagger */
  compute: {
    tagSlashCmds: (doc) => {
      doc.match([{ pre: '/' }]).tag('#SlashCmd')
    }
  },


  /** run it on init */
  hooks: ['tagSlashCmds']
}
export default slashCmd