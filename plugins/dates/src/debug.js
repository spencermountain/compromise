/* eslint-disable no-console */
import spacetime from 'spacetime'

const magenta = str => '\x1b[35m' + str + '\x1b[0m'
const dim = str => '\x1b[2m' + str + '\x1b[0m'
const cyan = str => '\x1b[36m' + str + '\x1b[0m'

const fmt = iso => (iso ? spacetime(iso).format('{nice-day} {year}') : '-')

const debug = function (view) {
  view.dates().forEach(m => {
    const res = m.dates().get()[0]

    console.log('\n────────')
    m.debug('highlight')

    let msg = ''
    if (res && res.start) {
      msg = '   ' + magenta(fmt(res.start))
    }
    if (res && res.end) {
      msg += dim('   →   ') + cyan(fmt(res.end))
    }
    console.log(msg + '\n')
  })
}
export default debug
