/* eslint-disable no-console */
import spacetime from 'spacetime'

import { magenta, dim, cyan } from './_debug.js'

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
