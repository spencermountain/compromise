/* eslint-disable no-console */
import spacetime from 'spacetime'

const fmt = iso => (iso ? spacetime(iso).format('{day-short} {nice} {year}') : '-')

const debug = function (view) {
  console.log('=-=-=-= here -=-=-=-')
  view.dates().forEach(m => {
    // console.log(m.dates().get())
    // console.log(found[0].dates)
    // found.forEach((o) => {
    //   console.log('start: ', fmt(o.dates.start))
    //   console.log('  end: ', fmt(o.dates.end))
    // })

    console.log('\n────────')
    m.debug('highlight')
    console.log('\n')
  })
}
export default debug
