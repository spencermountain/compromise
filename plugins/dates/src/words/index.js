let lex = {}

const data = [
  [require('./dates'), ['#Date']],
  [require('./durations'), ['#Duration']],
  [require('./holidays'), ['#Holiday']],
  [require('./times'), ['#Time']],
]
data.forEach(a => {
  for (let i = 0; i < a[0].length; i++) {
    lex[a[0][i]] = a[1]
  }
})

module.exports = lex
