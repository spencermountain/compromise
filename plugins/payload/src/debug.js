/* eslint-disable no-console */

// pretty-print each match that has a payload
const debug = function (view) {
  view.getPayloads().forEach(res => {
    const { match, val } = res
    console.log('\n────────')
    match.debug('highlight')
    console.log('    ', JSON.stringify(val))
    console.log('\n')
  })
}
export default debug
