const parseSyntax = require('./syntax')

const matchMethods = function(Doc) {
  const methods = {
    //return a new Doc, with us as a parent
    match: function(reg) {
      //parse-up the input expression
      let regs = parseSyntax(reg)
      //try expression on each phrase
      let matches = this.list.reduce((arr, p) => {
        return arr.concat(p.match(regs))
      }, [])
      return new Doc(matches, this, this.world)
    },
    //return everything that's not this.
    not: function(reg) {
      //parse-up the input expression
      let regs = parseSyntax(reg)
      //try expression on each phrase
      let matches = this.list.reduce((arr, p) => {
        return arr.concat(p.not(regs))
      }, [])
      return new Doc(matches, this, this.world)
    },
    matchOne: function(reg) {
      let regs = parseSyntax(reg)
      let found = this.list.find(p => p.match(regs).length > 0)
      return new Doc([found], this, this.world)
    },
    split: function(reg) {
      let regs = parseSyntax(reg)
      let matches = []
      this.list.forEach(p => {
        let found = p.match(regs)
        //no match, keep it going
        if (found.length === 0) {
          matches.push(p)
        }
        //support multiple-matches per phrase
        let results = p.splitOn(found[0])
        if (results.before) {
          matches.push(results.before)
        }
        if (results.match) {
          matches.push(results.match)
        }
        if (results.after) {
          matches.push(results.after)
        }
      })
      return new Doc(matches, this, this.world)
    },
    splitAfter: function(reg) {
      let regs = parseSyntax(reg)
      let matches = []
      this.list.forEach(p => {
        let allFound = p.match(regs)
        //no match, return whole phrase
        if (allFound.length === 0) {
          matches.push(p)
          return
        }
        allFound.forEach(found => {
          // apply it to the end, recursively
          let last = matches.pop() || p
          let results = last.splitOn(found) //splits into three parts
          //merge first and second parts
          if (results.before && results.match) {
            results.before.length += results.match.length
            matches.push(results.before)
          } else if (results.match) {
            matches.push(results.match)
          }
          // add third part, if it exists
          if (results.after) {
            matches.push(results.after)
          }
        })
      })
      return new Doc(matches, this, this.world)
    },

    splitBefore: function(reg) {
      let regs = parseSyntax(reg)
      let matches = []
      this.list.forEach(p => {
        let found = p.match(regs)
        //no match, keep it going
        if (found.length === 0) {
          matches.push(p)
        }
        //support multiple-matches per phrase
        let results = p.splitOn(found[0])
        if (results.before) {
          matches.push(results.before)
        }
        //merge 'match' and 'after'
        if (results.match && results.after) {
          results.match.length += results.after.length
          matches.push(results.match)
        } else if (results.match) {
          matches.push(results.match)
        }
      })
      return new Doc(matches, this, this.world)
    },
    has: function(reg) {
      let regs = parseSyntax(reg)
      let found = this.list.find(p => p.match(regs).length > 0)
      return found !== undefined
    },
    if: function(reg) {
      let regs = parseSyntax(reg)
      let found = this.list.filter(p => p.match(regs).length > 0)
      return new Doc(found, this, this.world)
    },
    ifNo: function(reg) {
      let regs = parseSyntax(reg)
      let found = this.list.filter(p => p.match(regs).length === 0)
      return new Doc(found, this, this.world)
    },
  }
  //aliases
  methods.splitOn = methods.split
  Object.keys(methods).forEach(k => {
    Doc.prototype[k] = methods[k]
  })
  return Doc
}

module.exports = matchMethods
