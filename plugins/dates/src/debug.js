/* eslint-disable no-console */
import spacetime from 'spacetime'

const fmt = iso => (iso ? spacetime(iso).format('{nice-day} {year}') : '-')

// https://stackoverflow.com/questions/9781218/how-to-change-node-jss-console-font-color
const reset = '\x1b[0m'

//cheaper than requiring chalk
const cli = {
  magenta: str => '\x1b[35m' + str + reset,
  cyan: str => '\x1b[36m' + str + reset,
  yellow: str => '\x1b[33m' + str + reset,
  dim: str => '\x1b[2m' + str + reset,
  i: str => '\x1b[3m' + str + reset,
}

const debug = function (view) {
  view.dates().forEach(m => {
    let res = m.dates().get()[0]

    console.log('\n────────')
    m.debug('highlight')

    let msg = ''
    if (res && res.start) {
      msg = '   ' + cli.magenta(fmt(res.start))
    }
    if (res && res.end) {
      msg += cli.dim('   →   ') + cli.cyan(fmt(res.end))
    }
    console.log(msg + '\n')
  })
}
export default debug
