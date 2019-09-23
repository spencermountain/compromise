// allow helper methods like .adjectives() and .adverbs()
const arr = [['adjectives', '#Adjective'], ['hashTags', '#HashTag'], ['urls', '#Url'], ['adverbs', '#Adverb']]
let methods = {}
arr.forEach(a => {
  methods[a[0]] = function(n) {
    let r = this.match(a[1])
    if (typeof n === 'number') {
      r = r.get(n)
    }
    return r
  }
})
module.exports = methods
