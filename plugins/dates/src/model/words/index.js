import timezones from './timezones.js'
import falsePositives from './false-positives.js'
import dates from './dates.js'
import durations from './durations.js'
import holidays from './holidays.js'
import times from './times.js'

const lex = {
  'a couple': 'Value',
  thur: 'WeekDay',
  thurs: 'WeekDay',
}
const add = function (arr, tag) {
  arr.forEach(str => {
    lex[str] = tag
  })
}
// tag most timezone words - the ambiguous ones need context, and stay out of the lexicon
const skipTz = new Set(falsePositives)
add(Object.keys(timezones).filter(str => !skipTz.has(str)), 'Timezone')
add(dates, 'Date')
add(durations, 'Duration')
add(holidays, 'Holiday')
add(times, 'Time')
// console.log(lex['april fools'])

export default lex
