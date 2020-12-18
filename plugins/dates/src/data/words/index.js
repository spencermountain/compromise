const timezones = require('../_timezones')
const data = [
  [require('./dates'), '#Date'],
  [require('./durations'), '#Duration'],
  [require('./holidays'), '#Holiday'],
  [require('./times'), '#Time'],
  [Object.keys(timezones), '#Timezone'],
]
let lex = {
  'a couple': 'Value',
}
data.forEach((a) => {
  for (let i = 0; i < a[0].length; i++) {
    lex[a[0][i]] = a[1]
  }
})

module.exports = lex
